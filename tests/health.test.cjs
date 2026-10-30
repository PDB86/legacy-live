const { test } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")
const vm = require("node:vm")
const ts = require("typescript")

// Compile source in memory so tests exercise the real action without sending email.
function load(file, dependencies = {}, env = {}) {
  const source = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  const module = { exports: {} }
  vm.runInNewContext(source, {
    module, exports: module.exports,
    require: (name) => Object.hasOwn(dependencies, name) ? dependencies[name] : require(name),
    process: { env }, console: { log() {}, error() {} }, FormData, Date,
  }, { filename: file })
  return module.exports
}

const validation = load("lib/contact-validation.ts")
function validForm() {
  const form = new FormData()
  for (const [key, value] of Object.entries({ name: "Test Customer", email: "test@example.com", eventDate: "2027-06-15" })) form.set(key, value)
  return form
}

function contact(send, env = { RESEND_API_KEY: "test-only-placeholder" }) {
  return load("app/actions/contact.ts", {
    "@/lib/contact-validation": validation,
    resend: { Resend: class { emails = { send } } },
  }, env).submitContactForm
}

test("rejects missing, malformed, oversized, and file-valued contact inputs before sending", async () => {
  let sends = 0
  const submit = contact(async () => { sends++; return { data: { id: "test" } } })
  for (const [key, value] of [["name", " "], ["email", "bad"], ["eventDate", "2027-02-30"], ["eventType", "invalid"], ["guests", "-1"], ["preferences", "x".repeat(10001)], ["name", new Blob(["file"]) ]]) {
    const form = validForm()
    form.set(key, value)
    assert.equal((await submit(form)).success, false, key)
  }
  assert.equal((await submit(new FormData())).success, false)
  assert.equal(sends, 0)
})

test("missing API key returns a controlled failure without sending", async () => {
  const submit = contact(() => { throw Error("must not send") }, {})
  assert.equal((await submit(validForm())).success, false)
})

test("provider rejection, empty response, and transport failure never report success", async () => {
  for (const send of [async () => ({ error: { name: "validation_error" }, data: null }), async () => ({ data: null, error: null }), async () => { throw Error("offline") }]) {
    assert.equal((await contact(send)(validForm())).success, false)
  }
})

test("successful inquiry preserves selected songs and sets reply-to", async () => {
  let sent
  const submit = contact(async (message) => { sent = message; return { data: { id: "test-message" }, error: null } })
  const form = validForm()
  form.set("preferences", "Selected songs:\nTake 5 - Dave Brubeck")
  assert.equal((await submit(form)).success, true)
  assert.equal(sent.replyTo, "test@example.com")
  assert.match(sent.text, /Take 5 - Dave Brubeck/)
  assert.equal(sent.to.length, 2)
})

test("setlist keeps typographic separators, hyphenated titles, and unique IDs", () => {
  const songs = load("lib/setlist-parser.ts").parseSetlist()
  assert.ok(songs.length > 405)
  assert.ok(songs.some(song => song.title === "Take 5" && song.artist === "Dave Brubeck"))
  assert.ok(songs.some(song => song.title === "Semi-Charmed Life" && song.artist === "Third Eye Blind"))
  assert.ok(songs.some(song => song.genres[0] === "Ballad"))
  assert.equal(new Set(songs.map(song => song.id)).size, songs.length)
})

test("literal image and video references resolve with exact filename case", () => {
  const available = new Set(fs.readdirSync("public"))
  const missing = []
  for (const file of ["app/page.tsx", "app/layout.tsx"]) {
    for (const match of fs.readFileSync(file, "utf8").matchAll(/["']\/([^"']+\.(?:png|jpg|jpeg|webp|svg|mp4|webm))["']/g)) {
      if (!available.has(match[1])) missing.push(`${file}: ${match[1]}`)
    }
  }
  assert.deepEqual(missing, [])
})

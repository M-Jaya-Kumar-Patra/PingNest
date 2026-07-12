# Bugs Fixed

## Bug 1

Problem

PowerShell did not support

mkdir -p src/{...}

Reason

Brace expansion works in Bash, not PowerShell.

Fix

Used PowerShell-compatible commands.

Learning

Always verify shell compatibility.

---

## Bug 2

Problem

SyntaxError:

super keyword unexpected here

Reason

ApiError class was missing

extends Error

Fix

class ApiError extends Error

Learning

super() can only be used inside classes extending another class.


## Bug

Problem:
Sensitive fields were being returned after login.

Reason:
Entire user document was sent in API response.

Fix:
Used:

.select("-password -refreshToken")

before returning user data.

Learning:
Never expose passwords, refresh tokens, or other sensitive fields in API responses.

## Bug

Problem:
TypeError: z.toString is not a function

Reason:
Used z.toString() instead of z.string().

Fix:
Replaced:

z.toString()

with:

z.string()

Learning:
Zod provides schema constructors such as:
z.string()
z.number()
z.boolean()

These are not JavaScript value conversion methods.



Problem:
TypeError: next is not a function

Reason:
Used async pre-save hook with next() callback.

Fix:
Removed next parameter and next() calls.

Learning:
Use either callback style OR async style, not both.




# Bugs Fixed

## Bug #1

Problem:
PowerShell did not support:

mkdir -p src/{...}

Reason:
Brace expansion is Bash syntax.

Fix:
Used PowerShell-compatible commands.

Learning:
Always verify shell compatibility.

---

## Bug #2

Problem:
super keyword unexpected here

Reason:
ApiError was not extending Error.

Fix:

class ApiError extends Error

Learning:
super() only works in child classes.

---

## Bug #3

Problem:
z.toString is not a function

Reason:
Used:

z.toString()

instead of:

z.string()

Fix:
Replaced with z.string().

Learning:
Zod uses schema constructors.

---

## Bug #4

Problem:
next is not a function

Reason:
Used async Mongoose pre-save hook together with next().

Wrong:

pre("save", async function(next){
   next()
})

Fix:

pre("save", async function(){
})

Learning:
Use callback style OR async style, not both.

---

## Bug #5

Problem:
Sensitive data could be returned in responses.

Fix:

.select("-password -refreshToken")

Learning:
Never expose passwords or refresh tokens.
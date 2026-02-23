/**
 * wardrobe.js — Barbie's Secret Wardrobe
 *
 * Barbie has hidden something precious in her wardrobe.
 * The contents are encoded as character codes below.
 *
 * YOUR CHALLENGE:
 *   Decode the array to find the hidden flag.
 *
 * HINT: JavaScript's String.fromCharCode() converts
 *       a number into its corresponding character.
 *       For example: String.fromCharCode(65) === "A"
 *
 * Try running this in your browser's DevTools console,
 * or paste it into Node.js!
 */

var barbieSecret = [
    67, 84, 70, 123, 106, 52, 118, 52,
    115, 99, 114, 49, 112, 116, 95, 48,
    98, 102, 117, 115, 99, 52, 116, 49,
    48, 110, 125
];

// The wardrobe is "locked" — it won't reveal the secret on its own.
// You need to decode it yourself!

function openWardrobe(masterKey) {
    if (masterKey === "IAmKenoughToOpenThis") {
        // Convert each number back to a character and join them
        return barbieSecret.map(function(code) {
            return String.fromCharCode(code);
        }).join('');
    }
    return "🔒 The wardrobe is locked. Try harder!";
}

// You don't know the masterKey... but do you need it?
// barbieSecret is right there. Can you decode it directly?

console.log("💅 Barbie's wardrobe has " + barbieSecret.length + " character codes.");
console.log("🔑 Can you decode what's inside without the master key?");

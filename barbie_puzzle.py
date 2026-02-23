#!/usr/bin/env python3
# ═══════════════════════════════════════════════════
#  barbie_puzzle.py — Barbie's Dreamhouse Password
# ═══════════════════════════════════════════════════
#
# Ken wrote this security program for Barbie's
# dreamhouse, but he forgot to write down what the
# correct password actually is!
#
# YOUR CHALLENGE:
#   Figure out what password makes check_password()
#   return True. That password IS the flag.
#   (It already includes CTF{...} format)
#
# HINT: The function applies a simple transformation
#       to each character. Can you reverse it?
#
# ═══════════════════════════════════════════════════

def check_password(s):
    # Each character's ASCII value + 1 must match expected
    expected = [68, 85, 71, 124, 113, 122, 117, 105,
                49, 111, 96, 115, 52, 119, 52, 115,
                116, 52, 101, 126]
    if len(s) != len(expected):
        return False
    return [ord(c) + 1 for c in s] == expected


def main():
    print("╔══════════════════════════════════╗")
    print("║  BARBIE'S DREAMHOUSE SECURITY    ║")
    print("╚══════════════════════════════════╝")
    password = input("Enter the dreamhouse password: ")
    if check_password(password):
        print("\n✨ Welcome to Barbie's Dreamhouse! You cracked it! ✨")
    else:
        print("\n❌ Ken says: 'That's not the magic word!'")
        print("   (The password starts with CTF{ and ends with })")


if __name__ == "__main__":
    main()

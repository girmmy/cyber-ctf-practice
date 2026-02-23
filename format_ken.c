/*
 * ═══════════════════════════════════════════════════════
 *  format_ken.c — Ken's Diary Application (Debug Build)
 * ═══════════════════════════════════════════════════════
 *
 * Ken wrote a diary app. He left a secret in memory
 * and accidentally introduced a format string vulnerability.
 *
 * YOUR CHALLENGE (2 parts):
 *
 *   Part 1: What string is stored in secret[]?
 *           Wrap it in CTF{} to get the flag.
 *
 *   Part 2 (Bonus): What is wrong with the printf() call?
 *           What should it say instead?
 *
 * ═══════════════════════════════════════════════════════
 */

#include <stdio.h>
#include <string.h>

int main() {
    /* Ken's top secret — stored on the stack */
    char secret[] = "f0rm4t_str1ng_l34k";

    char diary_entry[128];

    printf("=== Ken's Diary App ===\n");
    printf("What would you like to write today?\n> ");
    fgets(diary_entry, sizeof(diary_entry), stdin);

    /* ⚠️  BUG: This line has a format string vulnerability!      */
    /* ⚠️  It should be:  printf("%s", diary_entry);              */
    /* ⚠️  But instead it passes user input directly to printf()  */
    printf(diary_entry);   /* <-- DANGEROUS: format string bug!   */

    return 0;
}

/*
 * LEARNING NOTES — Format String Vulnerabilities:
 *
 *  When printf(user_input) is called, the user controls the format string.
 *  If the input contains % specifiers like %s, %x, %p, printf will read
 *  from the stack — potentially leaking sensitive data (like secret[]).
 *
 *  Try running this program and entering:  %s %s %s %s %s %s %s %s
 *  You might see data from the stack, including "secret"!
 *
 *  Fix: Always use printf("%s", user_input) — never printf(user_input)
 *
 *  The flag is the contents of secret[], wrapped in CTF{}
 */

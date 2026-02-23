/*
 * ═══════════════════════════════════════════════════════
 *  buffer_barbie.c — Barbie's Dreamhouse Security System
 * ═══════════════════════════════════════════════════════
 *
 * This is a debug build of Barbie's gate security program.
 * It has a classic vulnerability baked in.
 *
 * YOUR CHALLENGE (2 parts):
 *
 *   Part 1: What vulnerability exists in enter_dreamhouse()?
 *           (You don't need to exploit it — just name it!)
 *
 *   Part 2: What does secret_room() print?
 *           That output, wrapped in CTF{}, is the flag.
 *           (Hint: read the code carefully — no need to compile)
 *
 * ═══════════════════════════════════════════════════════
 */

#include <stdio.h>
#include <string.h>

/* This function is never called normally... but what if it were? */
void secret_room() {
    char part1[] = "buff3r_";
    char part2[] = "0v3rfl0w";
    char part3[] = "_4_b4rb13";
    printf("You found Barbie's secret room!\n");
    printf("The magic word is: %s%s%s\n", part1, part2, part3);
}

void enter_dreamhouse(char *guest_name) {
    char buffer[16];          /* Only 16 bytes allocated! */
    strcpy(buffer, guest_name); /* Copies without checking length! */
    printf("Hello %s, welcome to the Dreamhouse!\n", buffer);
}

int main() {
    char name[256];
    printf("What is your name, guest? ");
    gets(name);               /* gets() never checks input length! */
    enter_dreamhouse(name);
    return 0;
}

/*
 * LEARNING NOTES:
 *  - gets() is so dangerous it was REMOVED from the C standard in C11
 *  - strcpy() with no length check allows buffer overflow
 *  - An attacker could overflow buffer[16] to overwrite the return
 *    address on the stack and redirect execution to secret_room()
 *  - Safe alternatives: fgets(), strncpy(), strlcpy()
 */

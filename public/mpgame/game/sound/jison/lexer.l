
// LEXER

%%
digit    [0-9]

\s+
{digit}    return DIGIT
<<EOF>>    return EOF;

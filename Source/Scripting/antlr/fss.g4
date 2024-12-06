// ===============
// Defines Flight Sim Scripture
// ===============
grammar fss;

script : statement+ ;

statement
    : varDeclare
    | varSet
    | varRead
    | dispose
    | groupDeclare
    | groupPoll
    ;

groupDeclare : 'group' ID '{' (varDef (',')?)+ '}' ;
groupPoll : 'poll' ID 'every' INT 'seconds' ;

varDeclare  : 'var' varDef;
varSet      : 'set' ID 'to' INT ;
varRead     : 'read' ID ;

dispose  : 'yeet' ID ;

varDef : ID ('at' HEX)? ;

ID          : [a-zA-Z_][a-zA-Z_0-9]* ;
HEX         : '0x' [0-9a-fA-F]+ ;
INT         : [0-9]+ ;
WS          : [ \t\r\n]+ -> skip ;

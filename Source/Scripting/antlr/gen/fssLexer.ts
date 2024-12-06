// Generated from C:/Users/jordan/Desktop/thingymabob/Source/Scripting/antlr/fss.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class fssLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly ID = 14;
	public static readonly HEX = 15;
	public static readonly INT = 16;
	public static readonly WS = 17;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: (string | null)[] = [ null, "'group'", 
                                                            "'{'", "','", 
                                                            "'}'", "'poll'", 
                                                            "'every'", "'seconds'", 
                                                            "'var'", "'set'", 
                                                            "'to'", "'read'", 
                                                            "'yeet'", "'at'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "ID", "HEX", 
                                                             "INT", "WS" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
		"T__9", "T__10", "T__11", "T__12", "ID", "HEX", "INT", "WS",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, fssLexer._ATN, fssLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "fss.g4"; }

	public get literalNames(): (string | null)[] { return fssLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return fssLexer.symbolicNames; }
	public get ruleNames(): string[] { return fssLexer.ruleNames; }

	public get serializedATN(): number[] { return fssLexer._serializedATN; }

	public get channelNames(): string[] { return fssLexer.channelNames; }

	public get modeNames(): string[] { return fssLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,17,117,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,1,4,1,4,1,4,
	1,5,1,5,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,
	1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,
	1,11,1,12,1,12,1,12,1,13,1,13,5,13,93,8,13,10,13,12,13,96,9,13,1,14,1,14,
	1,14,1,14,4,14,102,8,14,11,14,12,14,103,1,15,4,15,107,8,15,11,15,12,15,
	108,1,16,4,16,112,8,16,11,16,12,16,113,1,16,1,16,0,0,17,1,1,3,2,5,3,7,4,
	9,5,11,6,13,7,15,8,17,9,19,10,21,11,23,12,25,13,27,14,29,15,31,16,33,17,
	1,0,5,3,0,65,90,95,95,97,122,4,0,48,57,65,90,95,95,97,122,3,0,48,57,65,
	70,97,102,1,0,48,57,3,0,9,10,13,13,32,32,120,0,1,1,0,0,0,0,3,1,0,0,0,0,
	5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,
	0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,
	1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,1,35,1,0,0,0,3,41,1,0,0,
	0,5,43,1,0,0,0,7,45,1,0,0,0,9,47,1,0,0,0,11,52,1,0,0,0,13,58,1,0,0,0,15,
	66,1,0,0,0,17,70,1,0,0,0,19,74,1,0,0,0,21,77,1,0,0,0,23,82,1,0,0,0,25,87,
	1,0,0,0,27,90,1,0,0,0,29,97,1,0,0,0,31,106,1,0,0,0,33,111,1,0,0,0,35,36,
	5,103,0,0,36,37,5,114,0,0,37,38,5,111,0,0,38,39,5,117,0,0,39,40,5,112,0,
	0,40,2,1,0,0,0,41,42,5,123,0,0,42,4,1,0,0,0,43,44,5,44,0,0,44,6,1,0,0,0,
	45,46,5,125,0,0,46,8,1,0,0,0,47,48,5,112,0,0,48,49,5,111,0,0,49,50,5,108,
	0,0,50,51,5,108,0,0,51,10,1,0,0,0,52,53,5,101,0,0,53,54,5,118,0,0,54,55,
	5,101,0,0,55,56,5,114,0,0,56,57,5,121,0,0,57,12,1,0,0,0,58,59,5,115,0,0,
	59,60,5,101,0,0,60,61,5,99,0,0,61,62,5,111,0,0,62,63,5,110,0,0,63,64,5,
	100,0,0,64,65,5,115,0,0,65,14,1,0,0,0,66,67,5,118,0,0,67,68,5,97,0,0,68,
	69,5,114,0,0,69,16,1,0,0,0,70,71,5,115,0,0,71,72,5,101,0,0,72,73,5,116,
	0,0,73,18,1,0,0,0,74,75,5,116,0,0,75,76,5,111,0,0,76,20,1,0,0,0,77,78,5,
	114,0,0,78,79,5,101,0,0,79,80,5,97,0,0,80,81,5,100,0,0,81,22,1,0,0,0,82,
	83,5,121,0,0,83,84,5,101,0,0,84,85,5,101,0,0,85,86,5,116,0,0,86,24,1,0,
	0,0,87,88,5,97,0,0,88,89,5,116,0,0,89,26,1,0,0,0,90,94,7,0,0,0,91,93,7,
	1,0,0,92,91,1,0,0,0,93,96,1,0,0,0,94,92,1,0,0,0,94,95,1,0,0,0,95,28,1,0,
	0,0,96,94,1,0,0,0,97,98,5,48,0,0,98,99,5,120,0,0,99,101,1,0,0,0,100,102,
	7,2,0,0,101,100,1,0,0,0,102,103,1,0,0,0,103,101,1,0,0,0,103,104,1,0,0,0,
	104,30,1,0,0,0,105,107,7,3,0,0,106,105,1,0,0,0,107,108,1,0,0,0,108,106,
	1,0,0,0,108,109,1,0,0,0,109,32,1,0,0,0,110,112,7,4,0,0,111,110,1,0,0,0,
	112,113,1,0,0,0,113,111,1,0,0,0,113,114,1,0,0,0,114,115,1,0,0,0,115,116,
	6,16,0,0,116,34,1,0,0,0,5,0,94,103,108,113,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!fssLexer.__ATN) {
			fssLexer.__ATN = new ATNDeserializer().deserialize(fssLexer._serializedATN);
		}

		return fssLexer.__ATN;
	}


	static DecisionsToDFA = fssLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}
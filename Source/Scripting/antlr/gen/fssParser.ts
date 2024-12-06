// Generated from C:/Users/jordan/Desktop/thingymabob/Source/Scripting/antlr/fss.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import fssListener from "./fssListener";
import fssVisitor from "./fssVisitor";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class fssParser extends Parser {
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
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_script = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_groupDeclare = 2;
	public static readonly RULE_groupPoll = 3;
	public static readonly RULE_varDeclare = 4;
	public static readonly RULE_varSet = 5;
	public static readonly RULE_varRead = 6;
	public static readonly RULE_dispose = 7;
	public static readonly RULE_varDef = 8;
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
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"script", "statement", "groupDeclare", "groupPoll", "varDeclare", "varSet", 
		"varRead", "dispose", "varDef",
	];
	public get grammarFileName(): string { return "fss.g4"; }
	public get literalNames(): (string | null)[] { return fssParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return fssParser.symbolicNames; }
	public get ruleNames(): string[] { return fssParser.ruleNames; }
	public get serializedATN(): number[] { return fssParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, fssParser._ATN, fssParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public script(): ScriptContext {
		let localctx: ScriptContext = new ScriptContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, fssParser.RULE_script);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 19;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 18;
				this.statement();
				}
				}
				this.state = 21;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 6946) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let localctx: StatementContext = new StatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, fssParser.RULE_statement);
		try {
			this.state = 29;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 8:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 23;
				this.varDeclare();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 24;
				this.varSet();
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 25;
				this.varRead();
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 26;
				this.dispose();
				}
				break;
			case 1:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 27;
				this.groupDeclare();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 28;
				this.groupPoll();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public groupDeclare(): GroupDeclareContext {
		let localctx: GroupDeclareContext = new GroupDeclareContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, fssParser.RULE_groupDeclare);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 31;
			this.match(fssParser.T__0);
			this.state = 32;
			this.match(fssParser.ID);
			this.state = 33;
			this.match(fssParser.T__1);
			this.state = 38;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 34;
				this.varDef();
				this.state = 36;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===3) {
					{
					this.state = 35;
					this.match(fssParser.T__2);
					}
				}

				}
				}
				this.state = 40;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===14);
			this.state = 42;
			this.match(fssParser.T__3);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public groupPoll(): GroupPollContext {
		let localctx: GroupPollContext = new GroupPollContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, fssParser.RULE_groupPoll);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 44;
			this.match(fssParser.T__4);
			this.state = 45;
			this.match(fssParser.ID);
			this.state = 46;
			this.match(fssParser.T__5);
			this.state = 47;
			this.match(fssParser.INT);
			this.state = 48;
			this.match(fssParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public varDeclare(): VarDeclareContext {
		let localctx: VarDeclareContext = new VarDeclareContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, fssParser.RULE_varDeclare);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 50;
			this.match(fssParser.T__7);
			this.state = 51;
			this.varDef();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public varSet(): VarSetContext {
		let localctx: VarSetContext = new VarSetContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, fssParser.RULE_varSet);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 53;
			this.match(fssParser.T__8);
			this.state = 54;
			this.match(fssParser.ID);
			this.state = 55;
			this.match(fssParser.T__9);
			this.state = 56;
			this.match(fssParser.INT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public varRead(): VarReadContext {
		let localctx: VarReadContext = new VarReadContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, fssParser.RULE_varRead);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 58;
			this.match(fssParser.T__10);
			this.state = 59;
			this.match(fssParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public dispose(): DisposeContext {
		let localctx: DisposeContext = new DisposeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, fssParser.RULE_dispose);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 61;
			this.match(fssParser.T__11);
			this.state = 62;
			this.match(fssParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public varDef(): VarDefContext {
		let localctx: VarDefContext = new VarDefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, fssParser.RULE_varDef);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 64;
			this.match(fssParser.ID);
			this.state = 67;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===13) {
				{
				this.state = 65;
				this.match(fssParser.T__12);
				this.state = 66;
				this.match(fssParser.HEX);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,17,70,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,1,0,4,0,20,
	8,0,11,0,12,0,21,1,1,1,1,1,1,1,1,1,1,1,1,3,1,30,8,1,1,2,1,2,1,2,1,2,1,2,
	3,2,37,8,2,4,2,39,8,2,11,2,12,2,40,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,4,
	1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,7,1,7,1,7,1,8,1,8,1,8,3,8,68,
	8,8,1,8,0,0,9,0,2,4,6,8,10,12,14,16,0,0,69,0,19,1,0,0,0,2,29,1,0,0,0,4,
	31,1,0,0,0,6,44,1,0,0,0,8,50,1,0,0,0,10,53,1,0,0,0,12,58,1,0,0,0,14,61,
	1,0,0,0,16,64,1,0,0,0,18,20,3,2,1,0,19,18,1,0,0,0,20,21,1,0,0,0,21,19,1,
	0,0,0,21,22,1,0,0,0,22,1,1,0,0,0,23,30,3,8,4,0,24,30,3,10,5,0,25,30,3,12,
	6,0,26,30,3,14,7,0,27,30,3,4,2,0,28,30,3,6,3,0,29,23,1,0,0,0,29,24,1,0,
	0,0,29,25,1,0,0,0,29,26,1,0,0,0,29,27,1,0,0,0,29,28,1,0,0,0,30,3,1,0,0,
	0,31,32,5,1,0,0,32,33,5,14,0,0,33,38,5,2,0,0,34,36,3,16,8,0,35,37,5,3,0,
	0,36,35,1,0,0,0,36,37,1,0,0,0,37,39,1,0,0,0,38,34,1,0,0,0,39,40,1,0,0,0,
	40,38,1,0,0,0,40,41,1,0,0,0,41,42,1,0,0,0,42,43,5,4,0,0,43,5,1,0,0,0,44,
	45,5,5,0,0,45,46,5,14,0,0,46,47,5,6,0,0,47,48,5,16,0,0,48,49,5,7,0,0,49,
	7,1,0,0,0,50,51,5,8,0,0,51,52,3,16,8,0,52,9,1,0,0,0,53,54,5,9,0,0,54,55,
	5,14,0,0,55,56,5,10,0,0,56,57,5,16,0,0,57,11,1,0,0,0,58,59,5,11,0,0,59,
	60,5,14,0,0,60,13,1,0,0,0,61,62,5,12,0,0,62,63,5,14,0,0,63,15,1,0,0,0,64,
	67,5,14,0,0,65,66,5,13,0,0,66,68,5,15,0,0,67,65,1,0,0,0,67,68,1,0,0,0,68,
	17,1,0,0,0,5,21,29,36,40,67];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!fssParser.__ATN) {
			fssParser.__ATN = new ATNDeserializer().deserialize(fssParser._serializedATN);
		}

		return fssParser.__ATN;
	}


	static DecisionsToDFA = fssParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ScriptContext extends ParserRuleContext {
	constructor(parser?: fssParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
    public get ruleIndex(): number {
    	return fssParser.RULE_script;
	}
	public enterRule(listener: fssListener): void {
	    if(listener.enterScript) {
	 		listener.enterScript(this);
		}
	}
	public exitRule(listener: fssListener): void {
	    if(listener.exitScript) {
	 		listener.exitScript(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fssVisitor<Result>): Result {
		if (visitor.visitScript) {
			return visitor.visitScript(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	constructor(parser?: fssParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public varDeclare(): VarDeclareContext {
		return this.getTypedRuleContext(VarDeclareContext, 0) as VarDeclareContext;
	}
	public varSet(): VarSetContext {
		return this.getTypedRuleContext(VarSetContext, 0) as VarSetContext;
	}
	public varRead(): VarReadContext {
		return this.getTypedRuleContext(VarReadContext, 0) as VarReadContext;
	}
	public dispose(): DisposeContext {
		return this.getTypedRuleContext(DisposeContext, 0) as DisposeContext;
	}
	public groupDeclare(): GroupDeclareContext {
		return this.getTypedRuleContext(GroupDeclareContext, 0) as GroupDeclareContext;
	}
	public groupPoll(): GroupPollContext {
		return this.getTypedRuleContext(GroupPollContext, 0) as GroupPollContext;
	}
    public get ruleIndex(): number {
    	return fssParser.RULE_statement;
	}
	public enterRule(listener: fssListener): void {
	    if(listener.enterStatement) {
	 		listener.enterStatement(this);
		}
	}
	public exitRule(listener: fssListener): void {
	    if(listener.exitStatement) {
	 		listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fssVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GroupDeclareContext extends ParserRuleContext {
	constructor(parser?: fssParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(fssParser.ID, 0);
	}
	public varDef_list(): VarDefContext[] {
		return this.getTypedRuleContexts(VarDefContext) as VarDefContext[];
	}
	public varDef(i: number): VarDefContext {
		return this.getTypedRuleContext(VarDefContext, i) as VarDefContext;
	}
    public get ruleIndex(): number {
    	return fssParser.RULE_groupDeclare;
	}
	public enterRule(listener: fssListener): void {
	    if(listener.enterGroupDeclare) {
	 		listener.enterGroupDeclare(this);
		}
	}
	public exitRule(listener: fssListener): void {
	    if(listener.exitGroupDeclare) {
	 		listener.exitGroupDeclare(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fssVisitor<Result>): Result {
		if (visitor.visitGroupDeclare) {
			return visitor.visitGroupDeclare(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GroupPollContext extends ParserRuleContext {
	constructor(parser?: fssParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(fssParser.ID, 0);
	}
	public INT(): TerminalNode {
		return this.getToken(fssParser.INT, 0);
	}
    public get ruleIndex(): number {
    	return fssParser.RULE_groupPoll;
	}
	public enterRule(listener: fssListener): void {
	    if(listener.enterGroupPoll) {
	 		listener.enterGroupPoll(this);
		}
	}
	public exitRule(listener: fssListener): void {
	    if(listener.exitGroupPoll) {
	 		listener.exitGroupPoll(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fssVisitor<Result>): Result {
		if (visitor.visitGroupPoll) {
			return visitor.visitGroupPoll(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarDeclareContext extends ParserRuleContext {
	constructor(parser?: fssParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public varDef(): VarDefContext {
		return this.getTypedRuleContext(VarDefContext, 0) as VarDefContext;
	}
    public get ruleIndex(): number {
    	return fssParser.RULE_varDeclare;
	}
	public enterRule(listener: fssListener): void {
	    if(listener.enterVarDeclare) {
	 		listener.enterVarDeclare(this);
		}
	}
	public exitRule(listener: fssListener): void {
	    if(listener.exitVarDeclare) {
	 		listener.exitVarDeclare(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fssVisitor<Result>): Result {
		if (visitor.visitVarDeclare) {
			return visitor.visitVarDeclare(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarSetContext extends ParserRuleContext {
	constructor(parser?: fssParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(fssParser.ID, 0);
	}
	public INT(): TerminalNode {
		return this.getToken(fssParser.INT, 0);
	}
    public get ruleIndex(): number {
    	return fssParser.RULE_varSet;
	}
	public enterRule(listener: fssListener): void {
	    if(listener.enterVarSet) {
	 		listener.enterVarSet(this);
		}
	}
	public exitRule(listener: fssListener): void {
	    if(listener.exitVarSet) {
	 		listener.exitVarSet(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fssVisitor<Result>): Result {
		if (visitor.visitVarSet) {
			return visitor.visitVarSet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarReadContext extends ParserRuleContext {
	constructor(parser?: fssParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(fssParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return fssParser.RULE_varRead;
	}
	public enterRule(listener: fssListener): void {
	    if(listener.enterVarRead) {
	 		listener.enterVarRead(this);
		}
	}
	public exitRule(listener: fssListener): void {
	    if(listener.exitVarRead) {
	 		listener.exitVarRead(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fssVisitor<Result>): Result {
		if (visitor.visitVarRead) {
			return visitor.visitVarRead(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DisposeContext extends ParserRuleContext {
	constructor(parser?: fssParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(fssParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return fssParser.RULE_dispose;
	}
	public enterRule(listener: fssListener): void {
	    if(listener.enterDispose) {
	 		listener.enterDispose(this);
		}
	}
	public exitRule(listener: fssListener): void {
	    if(listener.exitDispose) {
	 		listener.exitDispose(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fssVisitor<Result>): Result {
		if (visitor.visitDispose) {
			return visitor.visitDispose(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarDefContext extends ParserRuleContext {
	constructor(parser?: fssParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(fssParser.ID, 0);
	}
	public HEX(): TerminalNode {
		return this.getToken(fssParser.HEX, 0);
	}
    public get ruleIndex(): number {
    	return fssParser.RULE_varDef;
	}
	public enterRule(listener: fssListener): void {
	    if(listener.enterVarDef) {
	 		listener.enterVarDef(this);
		}
	}
	public exitRule(listener: fssListener): void {
	    if(listener.exitVarDef) {
	 		listener.exitVarDef(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fssVisitor<Result>): Result {
		if (visitor.visitVarDef) {
			return visitor.visitVarDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

// Generated from C:/Users/jordan/Desktop/thingymabob/Source/Scripting/antlr/fss.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


import { ScriptContext } from "./fssParser";
import { StatementContext } from "./fssParser";
import { GroupDeclareContext } from "./fssParser";
import { GroupPollContext } from "./fssParser";
import { VarDeclareContext } from "./fssParser";
import { VarSetContext } from "./fssParser";
import { VarReadContext } from "./fssParser";
import { DisposeContext } from "./fssParser";
import { VarDefContext } from "./fssParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `fssParser`.
 */
export default class fssListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `fssParser.script`.
	 * @param ctx the parse tree
	 */
	enterScript?: (ctx: ScriptContext) => void;
	/**
	 * Exit a parse tree produced by `fssParser.script`.
	 * @param ctx the parse tree
	 */
	exitScript?: (ctx: ScriptContext) => void;
	/**
	 * Enter a parse tree produced by `fssParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `fssParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;
	/**
	 * Enter a parse tree produced by `fssParser.groupDeclare`.
	 * @param ctx the parse tree
	 */
	enterGroupDeclare?: (ctx: GroupDeclareContext) => void;
	/**
	 * Exit a parse tree produced by `fssParser.groupDeclare`.
	 * @param ctx the parse tree
	 */
	exitGroupDeclare?: (ctx: GroupDeclareContext) => void;
	/**
	 * Enter a parse tree produced by `fssParser.groupPoll`.
	 * @param ctx the parse tree
	 */
	enterGroupPoll?: (ctx: GroupPollContext) => void;
	/**
	 * Exit a parse tree produced by `fssParser.groupPoll`.
	 * @param ctx the parse tree
	 */
	exitGroupPoll?: (ctx: GroupPollContext) => void;
	/**
	 * Enter a parse tree produced by `fssParser.varDeclare`.
	 * @param ctx the parse tree
	 */
	enterVarDeclare?: (ctx: VarDeclareContext) => void;
	/**
	 * Exit a parse tree produced by `fssParser.varDeclare`.
	 * @param ctx the parse tree
	 */
	exitVarDeclare?: (ctx: VarDeclareContext) => void;
	/**
	 * Enter a parse tree produced by `fssParser.varSet`.
	 * @param ctx the parse tree
	 */
	enterVarSet?: (ctx: VarSetContext) => void;
	/**
	 * Exit a parse tree produced by `fssParser.varSet`.
	 * @param ctx the parse tree
	 */
	exitVarSet?: (ctx: VarSetContext) => void;
	/**
	 * Enter a parse tree produced by `fssParser.varRead`.
	 * @param ctx the parse tree
	 */
	enterVarRead?: (ctx: VarReadContext) => void;
	/**
	 * Exit a parse tree produced by `fssParser.varRead`.
	 * @param ctx the parse tree
	 */
	exitVarRead?: (ctx: VarReadContext) => void;
	/**
	 * Enter a parse tree produced by `fssParser.dispose`.
	 * @param ctx the parse tree
	 */
	enterDispose?: (ctx: DisposeContext) => void;
	/**
	 * Exit a parse tree produced by `fssParser.dispose`.
	 * @param ctx the parse tree
	 */
	exitDispose?: (ctx: DisposeContext) => void;
	/**
	 * Enter a parse tree produced by `fssParser.varDef`.
	 * @param ctx the parse tree
	 */
	enterVarDef?: (ctx: VarDefContext) => void;
	/**
	 * Exit a parse tree produced by `fssParser.varDef`.
	 * @param ctx the parse tree
	 */
	exitVarDef?: (ctx: VarDefContext) => void;
}


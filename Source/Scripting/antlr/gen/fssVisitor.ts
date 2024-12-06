// Generated from C:/Users/jordan/Desktop/thingymabob/Source/Scripting/antlr/fss.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `fssParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class fssVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `fssParser.script`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScript?: (ctx: ScriptContext) => Result;
	/**
	 * Visit a parse tree produced by `fssParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;
	/**
	 * Visit a parse tree produced by `fssParser.groupDeclare`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupDeclare?: (ctx: GroupDeclareContext) => Result;
	/**
	 * Visit a parse tree produced by `fssParser.groupPoll`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupPoll?: (ctx: GroupPollContext) => Result;
	/**
	 * Visit a parse tree produced by `fssParser.varDeclare`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarDeclare?: (ctx: VarDeclareContext) => Result;
	/**
	 * Visit a parse tree produced by `fssParser.varSet`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarSet?: (ctx: VarSetContext) => Result;
	/**
	 * Visit a parse tree produced by `fssParser.varRead`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarRead?: (ctx: VarReadContext) => Result;
	/**
	 * Visit a parse tree produced by `fssParser.dispose`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDispose?: (ctx: DisposeContext) => Result;
	/**
	 * Visit a parse tree produced by `fssParser.varDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarDef?: (ctx: VarDefContext) => Result;
}


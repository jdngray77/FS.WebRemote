import {VariableGroup} from "../FSUIPC/Variables/VariableGroup";
import fssVisitor from "./antlr/gen/fssVisitor";
import fssLexer from "./antlr/gen/fssLexer";
import {CharStream, CommonTokenStream, ParseTreeWalker} from "antlr4";
import fssParser, {
	DisposeContext,
	GroupDeclareContext,
	GroupPollContext,
	VarDeclareContext, VarReadContext,
	VarSetContext
} from "./antlr/gen/fssParser";
import {Logging} from "../Utility/Logging";
import {VariableManager} from "../FSUIPC/Variables/VariableManager";
import {FSUIPC} from "../FSUIPC/fsuipc";
import {SimVariable} from "../FSUIPC/Variables/SimVariable";

export class FssVm extends fssVisitor<Promise<boolean>>
{
	private manager: VariableManager;
	private defaultGroup!: VariableGroup;

	private walker = new ParseTreeWalker();

	constructor(private ws: FSUIPC) {
		super();
		this.manager = new VariableManager(ws);
	}

	async Init() {
		this.defaultGroup = await this.manager.CreateVariableGroupAsync("default");
	}

	async executeStatement(input: string): Promise<boolean>
	{
		try {
			let lexer = new fssLexer(new CharStream(input));
			let parser = new fssParser(new CommonTokenStream(lexer));

			if (parser.syntaxErrorsCount > 0)
			{
				throw new Error("Bad command.");
			}

			let parseTree = parser.statement();

			return await this.visit(parseTree);
		} catch (e) {
			Logging.LogError("Encountered a problem whilst executing", e)
			return false;
		}
	}

	/**
	 * Declares a variable group
	 *
	 * declare MyGroup { myVar at 0x12ab, myVar }
	 */
	visitGroupDeclare: (ctx: GroupDeclareContext) => Promise<boolean> = async (ctx) => {
		let name = ctx.ID().getText();

		if (this.manager.GetGroup(name) != undefined) {
			Logging.LogError(`group called ${name} already exists!`)
			return false;
		}

		let varDefs: SimVariable[] = [];

		for (let varDefContext of ctx.varDef_list()) {
			let varName = varDefContext.ID().getText();
			let varOffset: ubl<string> = varDefContext.HEX()?.getText() ?? undefined;

			let def = new SimVariable(varName, varName, varOffset);
			varDefs.push(def);
		}

		await this.manager.CreateVariableGroupAsync(name, ...varDefs)

		return true;
	};

	visitGroupPoll: (ctx: GroupPollContext) => Promise<boolean> = async (ctx) => {
		return false;
	};

	visitVarDeclare: (ctx: VarDeclareContext) => Promise<boolean> = async (ctx) => {
		return false;
	};

	visitVarSet: (ctx: VarSetContext) => Promise<boolean> = async (ctx) => {
		return false;
	};

	visitVarRead: (ctx: VarReadContext) => Promise<boolean> = async (ctx) => {
		return false;
	};

	/**
	 *
	 * @param ctx
	 */
	visitDispose: (ctx: DisposeContext) => Promise<boolean> = async (ctx) =>
	{
		return false;
	};
}
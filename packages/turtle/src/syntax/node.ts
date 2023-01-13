import { SyntaxToken, SyntaxTokens, TokenKind } from "./token.js";
import { SyntaxTrivia } from "./trivia.js";

export enum SyntaxKind {
    Document = 300,
    PrefixDirective,
    BaseDirective,
    SparqlBaseDirective,
    SparqlPrefixDirective,
    SubjectPredicateObjectList,
    BlankNodePredicateObjectList,
    PredicateObjectList,
    PredicateObjectListTail,
    VerbObjectList,
    ObjectList,
    ObjectListTail,
    A,
    BlankNodePropertyList,
    Collection,
    IntegerLiteral,
    DecimalLiteral,
    DoubleLiteral,
    RDFLiteral,
    LanguageTag,
    DatatypeAnnotation,
    BooleanLiteral,
    IRIReference,
    PrefixedName,
    BlankNodeLabel,
    Anon,
}

export interface DocumentSyntax {
    readonly kind: SyntaxKind.Document,
    readonly statements: ReadonlyArray<StatementSyntax>,
    readonly endOfFile: SyntaxTokens[TokenKind.EndOfFile],
}

export type StatementSyntax =
    | DirectiveSyntax
    | TriplesSyntax;

export type DirectiveSyntax =
    | PrefixDirectiveSyntax
    | BaseDirectiveSyntax
    | SparqlPrefixDirectiveSyntax
    | SparqlBaseDirectiveSyntax;

export interface PrefixDirectiveSyntax {
    readonly kind: SyntaxKind.PrefixDirective,
    readonly keyword: SyntaxTokens[TokenKind.AtPrefixKeyword],
    readonly prefixLabel: SyntaxTokens[TokenKind.PNAME_NS],
    readonly iriReference: SyntaxTokens[TokenKind.IRIREF],
    readonly dotToken: SyntaxTokens[TokenKind.Dot],
}

export interface BaseDirectiveSyntax {
    readonly kind: SyntaxKind.BaseDirective,
    readonly keyword: SyntaxTokens[TokenKind.AtBaseKeyword],
    readonly iriReference: SyntaxTokens[TokenKind.IRIREF],
    readonly dotToken: SyntaxTokens[TokenKind.Dot],
}

export interface SparqlBaseDirectiveSyntax {
    readonly kind: SyntaxKind.SparqlBaseDirective,
    readonly keyword: SyntaxTokens[TokenKind.BaseKeyword],
    readonly iriReference: SyntaxTokens[TokenKind.IRIREF],
}

export interface SparqlPrefixDirectiveSyntax {
    readonly kind: SyntaxKind.SparqlPrefixDirective,
    readonly keyword: SyntaxTokens[TokenKind.PrefixKeyword],
    readonly prefixLabel: SyntaxTokens[TokenKind.PNAME_NS],
    readonly iriReference: SyntaxTokens[TokenKind.IRIREF],
}

export type TriplesSyntax =
    | SubjectPredicateObjectListSyntax
    | BlankNodePredicateObjectListSyntax;

export interface SubjectPredicateObjectListSyntax {
    readonly kind: SyntaxKind.SubjectPredicateObjectList,
    readonly subject: SubjectSyntax,
    readonly predicateObjectList: PredicateObjectListSyntax,
    readonly dotToken: SyntaxTokens[TokenKind.Dot],
}

export interface BlankNodePredicateObjectListSyntax {
    readonly kind: SyntaxKind.BlankNodePredicateObjectList,
    readonly blankNode: BlankNodePropertyListSyntax,
    readonly predicateObjectList?: PredicateObjectListSyntax,
    readonly dotToken: SyntaxTokens[TokenKind.Dot],
}

export interface PredicateObjectListSyntax {
    readonly kind: SyntaxKind.PredicateObjectList,
    readonly verbObjectList: VerbObjectListSyntax,
    readonly tail?: PredicateObjectListTailSyntax,
}

export interface PredicateObjectListTailSyntax {
    readonly kind: SyntaxKind.PredicateObjectListTail,
    readonly semicolonToken: SyntaxTokens[TokenKind.Semicolon],
    readonly verbObjectList?: VerbObjectListSyntax,
    readonly tail?: PredicateObjectListTailSyntax,
}

export interface VerbObjectListSyntax {
    readonly kind: SyntaxKind.VerbObjectList,
    readonly verb: PredicateSyntax,
    readonly objectList: ObjectListSyntax,
}

export interface ObjectListSyntax {
    readonly kind: SyntaxKind.ObjectList,
    readonly object: ObjectSyntax,
    readonly tail?: ObjectListTailSyntax,
}

export interface ObjectListTailSyntax {
    readonly kind: SyntaxKind.ObjectListTail,
    readonly commaToken: SyntaxTokens[TokenKind.Comma],
    readonly object: ObjectSyntax,
    readonly tail?: ObjectListTailSyntax,
}

export type SubjectSyntax =
    | IRISyntax
    | BlankNodeSyntax
    | CollectionSyntax;

export type PredicateSyntax =
    | ASyntax
    | IRISyntax;

export type ObjectSyntax =
    | IRISyntax
    | BlankNodeSyntax
    | CollectionSyntax
    | BlankNodePropertyListSyntax
    | LiteralSyntax;

export type LiteralSyntax =
    | RDFLiteralSyntax
    | IntegerLiteralSyntax
    | DecimalLiteralSyntax
    | DoubleLiteralSyntax
    | BooleanLiteralSyntax;

export interface ASyntax {
    readonly kind: SyntaxKind.A,
    readonly keyword: SyntaxTokens[TokenKind.AKeyword],
}

export interface BlankNodePropertyListSyntax {
    readonly kind: SyntaxKind.BlankNodePropertyList,
    readonly openBracketToken: SyntaxTokens[TokenKind.OpenBracket],
    readonly predicateObjectList: PredicateObjectListSyntax,
    readonly closeBracketToken: SyntaxTokens[TokenKind.CloseBracket],
}

export interface CollectionSyntax {
    readonly kind: SyntaxKind.Collection,
    readonly openParenToken: SyntaxTokens[TokenKind.OpenParen],
    readonly objects: ReadonlyArray<ObjectSyntax>,
    readonly closeParenToken: SyntaxTokens[TokenKind.CloseParen],
}

export interface IntegerLiteralSyntax {
    readonly kind: SyntaxKind.IntegerLiteral,
    readonly token: SyntaxTokens[TokenKind.INTEGER],
}

export interface DecimalLiteralSyntax {
    readonly kind: SyntaxKind.DecimalLiteral,
    readonly token: SyntaxTokens[TokenKind.DECIMAL],
}

export interface DoubleLiteralSyntax {
    readonly kind: SyntaxKind.DoubleLiteral,
    readonly token: SyntaxTokens[TokenKind.DOUBLE],
}

export interface RDFLiteralSyntax {
    readonly kind: SyntaxKind.RDFLiteral,
    readonly token: SyntaxTokens[TokenKind.STRING_LITERAL_QUOTE] | SyntaxTokens[TokenKind.STRING_LITERAL_SINGLE_QUOTE] | SyntaxTokens[TokenKind.STRING_LITERAL_LONG_SINGLE_QUOTE] | SyntaxTokens[TokenKind.STRING_LITERAL_LONG_QUOTE],
    readonly suffix?: LanguageTagSyntax | DatatypeAnnotationSyntax,
}

export interface LanguageTagSyntax {
    readonly kind: SyntaxKind.LanguageTag,
    readonly token: SyntaxTokens[TokenKind.LANGTAG],
}

export interface DatatypeAnnotationSyntax {
    readonly kind: SyntaxKind.DatatypeAnnotation,
    readonly caretCaretToken: SyntaxTokens[TokenKind.CaretCaret],
    readonly iri: IRISyntax,
}

export interface BooleanLiteralSyntax {
    readonly kind: SyntaxKind.BooleanLiteral,
    readonly token: SyntaxTokens[TokenKind.TrueKeyword] | SyntaxTokens[TokenKind.FalseKeyword],
}

export type IRISyntax =
    | IRIReferenceSyntax
    | PrefixedNameSyntax;

export interface IRIReferenceSyntax {
    readonly kind: SyntaxKind.IRIReference,
    readonly token: SyntaxTokens[TokenKind.IRIREF],
}

export interface PrefixedNameSyntax {
    readonly kind: SyntaxKind.PrefixedName,
    readonly token: SyntaxTokens[TokenKind.PNAME_NS] | SyntaxTokens[TokenKind.PNAME_LN],
}

export type BlankNodeSyntax =
    | BlankNodeLabelSyntax
    | AnonSyntax;

export interface BlankNodeLabelSyntax {
    readonly kind: SyntaxKind.BlankNodeLabel,
    readonly token: SyntaxTokens[TokenKind.BLANK_NODE_LABEL],
}

export interface AnonSyntax {
    readonly kind: SyntaxKind.Anon,
    readonly openBracketToken: SyntaxTokens[TokenKind.OpenBracket],
    readonly closeBracketToken: SyntaxTokens[TokenKind.CloseBracket],
}

export type SyntaxNode =
    | DocumentSyntax
    | PrefixDirectiveSyntax
    | BaseDirectiveSyntax
    | SparqlBaseDirectiveSyntax
    | SparqlPrefixDirectiveSyntax
    | SubjectPredicateObjectListSyntax
    | BlankNodePredicateObjectListSyntax
    | PredicateObjectListSyntax
    | PredicateObjectListTailSyntax
    | VerbObjectListSyntax
    | ObjectListSyntax
    | ObjectListTailSyntax
    | ASyntax
    | BlankNodePropertyListSyntax
    | CollectionSyntax
    | IntegerLiteralSyntax
    | DecimalLiteralSyntax
    | DoubleLiteralSyntax
    | RDFLiteralSyntax
    | LanguageTagSyntax
    | DatatypeAnnotationSyntax
    | BooleanLiteralSyntax
    | IRIReferenceSyntax
    | PrefixedNameSyntax
    | BlankNodeLabelSyntax
    | AnonSyntax;

export namespace SyntaxNode {

    export function is(node: SyntaxTrivia | SyntaxToken | SyntaxNode): node is SyntaxNode {
        return node.kind >= 300;
    }

    export function* iterateTokens(node: SyntaxNode): Generator<SyntaxToken, void> {
        for (const key in node) {
            const value = node[key as keyof SyntaxNode] as SyntaxKind | SyntaxToken | SyntaxNode | SyntaxNode[] | undefined;
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    for (const element of value) {
                        yield* iterateTokens(element);
                    }
                }
                else if (SyntaxToken.is(value)) {
                    yield value;
                }
                else {
                    yield* iterateTokens(value);
                }
            }
        }
    }

    export function firstToken(node: SyntaxNode): SyntaxToken {
        switch (node.kind) {
            case SyntaxKind.Document:
                return node.statements.length ? firstToken(node.statements[0]) : node.endOfFile;
            case SyntaxKind.PrefixDirective:
            case SyntaxKind.BaseDirective:
            case SyntaxKind.SparqlBaseDirective:
            case SyntaxKind.SparqlPrefixDirective:
                return node.keyword;
            case SyntaxKind.SubjectPredicateObjectList:
                return firstToken(node.subject);
            case SyntaxKind.BlankNodePredicateObjectList:
                return firstToken(node.blankNode);
            case SyntaxKind.PredicateObjectList:
                return firstToken(node.verbObjectList);
            case SyntaxKind.PredicateObjectListTail:
                return node.semicolonToken;
            case SyntaxKind.VerbObjectList:
                return firstToken(node.verb);
            case SyntaxKind.ObjectList:
                return firstToken(node.object);
            case SyntaxKind.ObjectListTail:
                return node.commaToken;
            case SyntaxKind.A:
                return node.keyword;
            case SyntaxKind.BlankNodePropertyList:
                return node.openBracketToken;
            case SyntaxKind.Collection:
                return node.openParenToken;
            case SyntaxKind.IntegerLiteral:
            case SyntaxKind.DecimalLiteral:
            case SyntaxKind.DoubleLiteral:
            case SyntaxKind.RDFLiteral:
            case SyntaxKind.LanguageTag:
                return node.token;
            case SyntaxKind.DatatypeAnnotation:
                return node.caretCaretToken;
            case SyntaxKind.BooleanLiteral:
            case SyntaxKind.IRIReference:
            case SyntaxKind.PrefixedName:
            case SyntaxKind.BlankNodeLabel:
                return node.token;
            case SyntaxKind.Anon:
                return node.openBracketToken;
        }
    }

    export function lastToken(node: SyntaxNode): SyntaxToken {
        switch (node.kind) {
            case SyntaxKind.Document:
                return node.endOfFile;
            case SyntaxKind.PrefixDirective:
            case SyntaxKind.BaseDirective:
                return node.dotToken;
            case SyntaxKind.SparqlBaseDirective:
            case SyntaxKind.SparqlPrefixDirective:
                return node.iriReference;
            case SyntaxKind.SubjectPredicateObjectList:
            case SyntaxKind.BlankNodePredicateObjectList:
                return node.dotToken;
            case SyntaxKind.PredicateObjectList:
                return lastToken(node.tail ? node.tail : node.verbObjectList);
            case SyntaxKind.PredicateObjectListTail:
                return node.verbObjectList ? lastToken(node.verbObjectList) : node.semicolonToken;
            case SyntaxKind.VerbObjectList:
                return lastToken(node.objectList);
            case SyntaxKind.ObjectList:
                return lastToken(node.tail ? node.tail : node.object);
            case SyntaxKind.ObjectListTail:
                return lastToken(node.object);
            case SyntaxKind.A:
                return node.keyword;
            case SyntaxKind.BlankNodePropertyList:
                return node.closeBracketToken;
            case SyntaxKind.Collection:
                return node.closeParenToken;
            case SyntaxKind.IntegerLiteral:
            case SyntaxKind.DecimalLiteral:
            case SyntaxKind.DoubleLiteral:
                return node.token;
            case SyntaxKind.RDFLiteral:
                return node.suffix ? lastToken(node.suffix) : node.token;
            case SyntaxKind.LanguageTag:
                return node.token;
            case SyntaxKind.DatatypeAnnotation:
                return lastToken(node.iri);
            case SyntaxKind.BooleanLiteral:
            case SyntaxKind.IRIReference:
            case SyntaxKind.PrefixedName:
            case SyntaxKind.BlankNodeLabel:
                return node.token;
            case SyntaxKind.Anon:
                return node.closeBracketToken;
        }
    }
}

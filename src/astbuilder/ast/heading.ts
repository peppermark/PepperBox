import { ASTLeafNode } from './ast'
import { IllegalArgumentException } from '../../extensions/IllegalArgumentException'

export class ASTheading extends ASTLeafNode {
    public level: number
    public content: string

    public constructor(level: number, content: string) {
        // check validity
        if (level > 6 || level < 1 || !Number.isInteger(level)) {
            throw new IllegalArgumentException("ASTheading: 'level' of a heading must be an integer between [1;6]")
        }
        if (typeof content !== 'string') {
            throw new IllegalArgumentException("ASTheading: 'content' must be a string")
        }

        super()
        this.level = level
        this.content = content
    }

    private replaceStringInBetween(str: string): string {
        return str.replace(
            /^( +)([^ ].*[^ ])( +)$/,
            (match, c1, c2, c3) => c1 + c2.replace(/ +/g, ' ') + c3)
    }

    public toPeppermark(): string {
        return '='.repeat(this.level) + ' ' +
            this.replaceStringInBetween(this.interpretInlines(this.content))
    }
}
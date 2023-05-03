import { isClassDeclaration } from 'typescript'

export default interface ClassConstructor<T> {
	new (): T
}

export function isClass<T>(cls: any): cls is ClassConstructor<T> {
	if (!cls.prototype) {
		return false
	}
	return Object.getOwnPropertyNames(cls.prototype).length > 1
}
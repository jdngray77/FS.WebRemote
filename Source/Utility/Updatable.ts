export class Updatable<T>
{
	private updateListeners: ((x: T) => void)[] = [];

	OnUpdate(newListener: (a: T) => void)
	{
		this.updateListeners.push(newListener);
	}

	Update(update: T)
	{

	}
}
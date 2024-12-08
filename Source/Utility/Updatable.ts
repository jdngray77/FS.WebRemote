export class Updatable<T>
{
	private updateListeners: ((x: T) => void)[] = [];

	OnUpdate(newListener: (a: T) => void)
	{
		this.updateListeners.push(newListener);
	}

	Update(update: T)
	{
		for (let updateListener of this.updateListeners)
		{
			updateListener(update);
		}
	}
}
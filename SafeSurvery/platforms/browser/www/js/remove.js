function removeChildren(inValue)
{
	if(document.getElementById(inValue) !== null)
	{
		var elements = document.getElementById(inValue);

		while(elements.firstChild)
		{
			elements.removeChild(elements.firstChild);
		}
	}
}

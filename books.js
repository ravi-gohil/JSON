var xmlHttp = createXmlHttpRequestObject();
function createXmlHttpRequestObject()
{
	var xmlHttp;
	try
	{
		xmlHttp = new XMLHttpRequest();
	}
	catch(e)
	{
		try
		{
			xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
		}
		catch(e) { }
	}
	if (!xmlHttp)
	alert("Error creating the XMLHttpRequest object.");
	else
	return xmlHttp;
}
function process()
{
	if (xmlHttp)
	{
		try
		{
			xmlHttp.open("GET", "books.txt", true);
			xmlHttp.onreadystatechange = handleRequestStateChange;
			xmlHttp.send(null);
		}
		catch (e)
		{
			alert("Can't connect to server:\n" + e.toString());
		}
	}
}
function handleRequestStateChange()
{
	if (xmlHttp.readyState == 4)
	{
		if (xmlHttp.status == 200)
		{
			try
			{
				handleServerResponse();
			}
			catch(e)
			{
				alert("Error reading the response: " + e.toString());
			}
		}
		else
		{
			alert("There was a problem retrieving the data:\n" + xmlHttp.statusText);
		}
	}
}
function handleServerResponse()
{
	var jsonResponse = eval ('(' + xmlHttp.responseText + ')');
	var html = "";
	for (var i=0; i<jsonResponse.books.length; i++)
	html += jsonResponse.books[i].title + ", " + jsonResponse.books[i].isbn + "<br />";
	myDiv = document.getElementById("myDivElement");

	myDiv.innerHTML = "<p>Server says: </p>" + html;
}
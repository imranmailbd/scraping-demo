  var x, i ,xmlDoc;
        var txt = "";
        var text = root;

        //parser = new DOMParser();
        //xmlDoc = parser.parseFromString(text,"text/xml");

        // documentElement always represents the root node
        x = root.childNodes;  //xmlDoc.documentElement.childNodes;
        for (i = 0; i < x.length ;i++) {
            txt += x[i].nodeName + ": " + x[i].childNodes[0].nodeValue + "<br>";
            console.log( x[i].nodeName + ": " + x[i].childNodes[0].nodeValue + "<br>");
        }
        


       // for (let i = 0; i < root.childNodes.length; i++) {
       //  console.log( root.childNodes[i].Elements() ); // Text, DIV, Text, UL, ..., SCRIPT
       // }


//var myTitle = document.getElementsByClassName("ticker-area").root.firstChild.nodeValue;
//console.log(myTitle);
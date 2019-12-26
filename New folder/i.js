firstNode = root.firstChild.structure;
    for (i = 0; i < firstNode.childNodes.length; i++) {
        if (firstNode.childNodes[i].nodeType == 1) {
            //Process only element nodes
            txt += firstNode.childNodes[i].nodeName +
            " = " +
            firstNode.childNodes[i].childNodes[0].nodeValue + "<br>";
        }
    }
    
    console.log(txt);
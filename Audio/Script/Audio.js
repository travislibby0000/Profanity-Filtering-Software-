<form action> www.Hulu.com


<head>
    <title>JavaScript BadWord Filter/title>
    <script type="text/javascript">
        var filterWords = ["fool", "dumb", "couch potato"];
        // "i" is to ignore case and "g" for global
        var rgx = new RegExp(filterWords.join(""), "gi");

        function wordFilter(str) {          
                return str.replace(rgx, "****");           
        }

        // call the function
        document.write("Original String - ");
        document.writeln("You fool. Why are you so dumb  <br/>");   
        document.write("Replaced String - ");
        document.writeln(wordFilter("You fool. Why are you so dumb"));   
    </script>
</head>

xconst jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
var request = require("request");
var  obj = {
   table: []
};
var id;
var stdin = process.openStdin();
stdin.addListener("data", function(d) {
    id = d.toString() ;
    if(id == '0\n'){
    	var json = JSON.stringify(obj);
		fs.writeFile('noticiasRussas.json',json, 'utf8');

    }else{
    		request("http://www.campusrussas.ufc.br/noticia.php?v="+id, function (error, response, body) {
			    if (!error) {
	        		var dom  = new JSDOM(body);
					var noticia = {titulo:'',
				   					conteudo:[],
						   			imagem :'http://www.campusrussas.ufc.br',
					   				dia :''
									};
	    			var pagina = dom.window.document.getElementById("page");

			    	noticia.titulo = pagina.children[0].textContent;
	    			noticia.imagem += pagina.children[1].src;    			
	    			var aux ;
    				var i = 2;
    				while(pagina.children[i]){
				    	aux = pagina.children[i].textContent;
		    			noticia.conteudo.push(aux);
	    				i++;		
			    	}
    				noticia.dia = pagina.children[i-1].textContent;
		    		obj.table.push(noticia);
	    			console.log(id);	
        		 
    			}
			});
    	}


  });





var allitems = ["all"];
var currencys = ["currency"];
var ammos = ["ammo"];
var armor = ["armor"];
var melee = ["melee"];
var gears = ["gear"];
var ranged = ["ranged"];
var weapons = ["weapons"];
var shields = ["shields"];
var potions = ["potions"];
var rods = ["rods"];
var rings = ["rings"];
var spellscrolls = ["spellscroll"];
var staffs = ["staff"];
var wonderous = ["wonderous"];
var wands = ["wand"];
var magicitems = ["magicitems"];
var gened = [];
var npcs = ["npcs"];
var xhttp = new XMLHttpRequest();
var isnewnpc = false
var npcholder = null;
var disp = [allitems];
xhttp.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    console.log("made it")
    myFunction(this);
    disp = []
    disp.push(allitems);
    display()
    }
};
/*xhttp.open("GET", "magic.xml", false);
xhttp.send()
xhttp.open("GET", "mundane.xml", false);
xhttp.send()
xhttp.open("GET", "valueableitems.xml", false);
xhttp.send()*/

//Filter Function
$("#filter").keyup(()=>{
    filter();
})
function filter(){
var input, filter, table, tr, td, i;
  input = document.getElementById("filter");
  filter = input.value.toUpperCase();
  table = document.getElementById("tablebody");
  tr = table.getElementsByTagName("tr");
  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td && !$(tr[i]).hasClass("information")) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
        //collapse item descriptions of open items
        $(tr).nextUntil(".title").toggleClass("open");
    } 
  }
}
//Show Hide Function
function showhide(item){
$(item).closest("tr").nextUntil(".title").toggleClass("open");
}
//Basic Import Function
function importitems(){
var responce = prompt("Type in the url of the items you want to import","http://example.com/items.xml")
xhttp.open("GET", responce, true)
xhttp.send()
}
//Declare Display variable

//Display Function
function display(){
$("#tablebody").empty()
	    for(i=0;i<disp.length;i++){
	    for(x=1;x<disp[i].length;x++){
$("#tablebody").append("<tr class='title' onclick='showhide(this)'><td  style='border:3px solid white; border-radius:10px;'><h3>"+disp[i][x].name+"</h3></td><td class='type'  style='border:3px solid white; border-radius:10px;'><p>"+disp[i][x].type+"</p></td><td class='weight'  style='border:3px solid white; border-radius:10px;'><p>"+disp[i][x].weight+"</p></td></tr><tr class='information'><td colspan='3' style='border:2px solid gray;border-radius:10px'><p>"+disp[i][x].text+"</p></td></tr>")
}
}
}
function displayinside(object,randomitem){
object.text = object.text + "<tr class='title' onclick='showhide(this)'><td  style='border:3px solid white; border-radius:10px;'><h3>"+randomitem.name+"</h3></td><td class='type'  style='border:3px solid white; border-radius:10px;'><p>"+randomitem.type+"</p></td><td class='weight'  style='border:3px solid white; border-radius:10px;'><p>"+randomitem.weight+"</p></td></tr><tr class='information'><td colspan='3' style='border:2px solid gray;border-radius:10px'><p>"+randomitem.text+"</p></td></tr>"
}
//XML Tag Handler
function myFunction(xml) {
    //var xmlDoc = xml.responseXML;
    var items = xml.getElementsByTagName("item")
    for(i=0;i<items.length;i++){
     new item(items[i])
     }
}
//Declare Location variable
var locationinarray;
//Start Constructors 
function item(xmltag){
this.name = "";
this.type = "";
this.value = "";
this.weight = "";
this.text = "";
this.roll = ""
this.ac = ""
this.strength = ""
this.stealth = ""
this.modifier = ""
this.dmgType = ""
this.dmg1 = ""
this.dmg2 = ""
this.property = ""
this.range = ""
this.rarity = ""
this.magic = ""
this.detail = ""
for(p=0;p<xmltag.children.length;p++){
var inner = xmltag.children[p].innerHTML
	switch(xmltag.children[p].tagName){
		
		case "name":
			this.name = this.name + inner
		break;
		case "type":
			this.type = this.type + inner
		break;
		case "value":
			this.value = this.value + inner
		break;
		case "weight":
			this.weight =  this.weight + inner
		break;
		case "text":
			this.text = this.text + "<br>" + inner
		break;
		case "roll":
			this.roll = this.roll + "<br>" + inner
		break;
		case "ac":
			this.ac = this.ac + inner
		break;
		case "strength":
			this.strength = this.strength + inner
		break;
		case "stealth":
			this.stealth = this.stealth + inner
		break;
		case "modifier":
			this.modifier = this.modifier + "<br>" + inner
		break;
		case "dmgType":
			this.dmgType = this.dmgType + inner
		break;
		case "dmg1":
			this.dmg1 = this.dmg1 + inner
		break;	
		case "property":
			this.property = this.property + inner
		break;
		case "range":
			this.range = this.range + inner
		break;
		case "dmg2":
			this.dmg2 = this.dmg2 + inner
		break;
        case "rarity":
            this.rarity = this.rarity + inner
        break;
        case "magic":
            this.magic = this.magic + inner
        break;
        case "detail":
            this.detail = this.detail + inner
        break;
		default:
			console.log(xmltag.children[p].tagName)
		break;
	}
}
this.text = this.name + "<br>" + this.text
allitems.push(this)
if(this.type != ""){
	switch(this.type){
		case "$":
			currencys.push(this)
		break;
		case "A":
			ammos.push(this)
		break;
		case "MA":
		case "HA":
		case "LA":
			armor.push(this)
		break;
		case "M":
			melee.push(this);
			weapons.push(this)
		break;
		case "R":
			ranged.push(this);
			weapons.push(this)
		break;
		case "G":
			gears.push(this);
		break;
		case "S":
			shields.push(this);
		break;
		case "P":
			potions.push(this);
			magicitems.push(this)
		break;
		case "RD":
			rods.push(this)
			magicitems.push(this)
		break;
		case "RG":
			rings.push(this)
			magicitems.push(this)
		break;
		case "SC":
			spellscrolls.push(this)
			magicitems.push(this)
		break;
		case "ST":
			staffs.push(this)
			magicitems.push(this)
		break;
		case "W":
			wonderous.push(this)
			magicitems.push(this)
		break;
		case "WD":
			wands.push(this);
			magicitems.push(this)
		break;
	}
}
}
//pass additional arrays for more variety
function npc(name, description, itemtypearray){
	this.name = name
	this.type = "npc"
	this.weight = null;
	this.description = description
	this.arrays = []
	var x = 0
	for(i=2;i<arguments.length;i++){
		this.arrays[x] = arguments[i];
		x++
	}
	this.text = ""
	this.gennewitems = function(){
		this.text = "";
		this.text = "<p>Items</p><table class='container'><thead><tr><th>Name</th><th class='type'>Type</th><th class='weight'>Weight</th></tr></thead><tbody>"
		for(i=0;i<this.arrays.length;i++){
		var rand1 = Math.round((Math.random() * 5))
		console.log(rand1)
		for(x=0;x<rand1;x++){
			var rand2 = Math.round((Math.random() * this.arrays[i].length))
			//this.text = this.text + "<br> " + this.arrays[i][rand2].name
			displayinside(this, this.arrays[i][rand2])
		}
	}
		this.text = this.text + "</tbody></table>"
		display()
	}
	npcs.push(this)
	this.gennewitems()
}
//End Constructors//Menu Functions
$("#item").change(()=>{
    $("select option:selected").each((i, v)=>{
        disp = []
        switch (v.value){
	case "all":
		disp.push(allitems)
	break;
	case "currency":
		disp.push(currencys)
	break;
	case "ammo":
		disp.push(ammos)
	break;
	case "armor":
		disp.push(armor)
	break;
	case "melee":
		disp.push(melee)
	break;
	case "gear":
		disp.push(gears)
	break;
	case "ranged":
		disp.push(ranged)
	break;
	case "weapon":
		disp.push(weapons)
	break;
	case "shield":
		disp.push(shields)
	break;
	case "potion":
		disp.push(potions)
	break;
	case "rod":
		disp.push(rods)
	break;
	case "ring":
		disp.push(rings)
	break;
	case "spell":
		disp.push(spellscrolls)
	break;
	case "staff":
		disp.push(staffs)
	break;
	case "wonderous":
		disp.push(wonderous)
	break;
	case "wand":
		disp.push(wands)
	break;
	case "magic":
		disp.push(magicitems)
	break;
	case "npc":
		disp.push(npcs)
	break;
	}
	display()
})
})
var data = fetch("magic.xml")
.then(response => response.text())
.then(str=>(new window.DOMParser()).parseFromString(str, "text/xml"))
.then(data => (myFunction(data)
              disp = [];
              disp.push(allitems);
              display()
              )
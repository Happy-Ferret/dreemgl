define.class("$server/composition",function($server$, service, $ui$, screen, view, $flow$dataset$, rovi, $flow$remotes$, xypad, $flow$display$, labtext) {
	this.render = function() {
		return [
			rovi({
				name:'myservice', 
				flowdata:{x:211, y:121}
			}),
			xypad({
				name:'xy1', 
				flowdata:{x:30, y:20}
			}),
			labtext({name:'lab', flowdata:{x:103, y:248}})
		]
	}
	
}
)
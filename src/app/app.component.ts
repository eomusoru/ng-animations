import { 
	Component, 
	trigger, 
	state, 
	style,
	transition,
	animate,
	keyframes,
	group
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
	animations: [
		trigger('divState', [
			state('normal', style({ 
				backgroundColor: 'red',
				transform: 'translateX(0)'
			})), // this should match the state of the AppComponent
			state('highlighted', style({
				backgroundColor: 'blue',
				transform: 'translateX(100px)'
			})),
			transition('normal <=> highlighted', animate(300))
		]),
		trigger('wildState', [
			state('normal', style({ 
				backgroundColor: 'red',
				transform: 'translateX(0) scale(1)',
				borderRadius: '0'
			})), // this shhould match the state of the AppComponent
			state('highlighted', style({
				backgroundColor: 'blue',
				transform: 'translateX(100px)  scale(1)',
				borderRadius: '0'
			})),
			state('shrunken', style({
				backgroundColor: 'green',
				transform: 'translateX(0px) scale(.5)',
				borderRadius: '0'
			})),
			transition('normal => highlighted', animate(300)),
			transition('highlighted => normal', animate(800)),
			transition('shrunken <=> *', [
				style({ // start point
					backgroundColor: 'orange',
				}),
				animate(1000, style({ // for 1000ms it's going to change it's border to border radius 50 
					borderRadius: '50px'
				})),
				animate(500) // after the border radius, it will came to border radius 0 in 500sec. This entire anime will have 1500ms
			])
		]),

		//DEFAULT
		trigger('list1', [
			state('in', style({ 
				opacity: '1',
				transform: 'translateX(0)'
			})), 
      // IN - When we want to animate in, we set the initial state in the transition void method, and first we declare the style() which will, contain the initial position and look
			transition('void => *', [
				// if void this is the initial state
				style({
					opacity: '0',
					transform: 'translateX(-100px)'
				}),
        animate(300)
			]), 
      // OUT - When we want to animate out, we then set the animation in transition, and after that set the style to which the animation should go
			transition('* => void', [
				// if void this is the initial state
        animate(300, style({
					transform: 'translateX(100px)',
					opacity: '0'
				}))
			]) 
		]),

			//DEFAULT
		trigger('list2', [
			state('in', style({ 
				opacity: '1',
				transform: 'translateX(0)'
			})), 
			transition('void => *', [
				animate(1000, keyframes([
					style({
						transform: 'translateX(-100px)',
						opacity: '0',
						offset: 0
					}),
					style({
						transform: 'translateX(-50px)',
						opacity: '0.5',
						offset: 0.3
					}),
					style({
						transform: 'translateX(-20px)',
						opacity: '1',
						offset: 0.8
					}),
					style({
						transform: 'translateX(0px)',
						opacity: '1',
						offset: 1
					})]
				))
			]), 
			transition('* => void', [
				group([
          animate(300, style({
					  color: 'red'
				  })),
          animate(800, style({
					  transform: 'translateX(100px)',
					  opacity: '0'
			    })) 
				]),
			])
		])
	]
})
export class AppComponent {
	state = 'normal'; //whatever we want 
	wildState = 'normal'; //whatever we want 
	list = ['Milk', 'Sugar', 'Bread'];

	onAdd(item) {
		this.list.push(item);
	}

	onDelete(item) {
		this.list.splice(this.list.indexOf(item), 1);
	}

	onAnimate(){
		this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
		this.wildState == 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
		
	}

	onShrink(){
		this.wildState = 'shrunken';
	}

	animationStarted(event){
		console.log(event);
	}

	animationEnded(event){
		console.log(event);
	}
}

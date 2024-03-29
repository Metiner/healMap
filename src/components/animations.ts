
import {animate, state, style, transition, trigger} from "@angular/animations";

export const mapExpandAnimation = trigger('mapExpandAnimation',[

  transition('notExpanded => expanded',[
    style({
      marginTop:-500
    }),
    animate('700ms ease-out',style({
      marginTop:-100
    }))
  ]),

  transition('expanded => notExpanded',[
    style({
      marginTop:-100
    }),
    animate('700ms ease-out',style({
      marginTop:-500
    }))
  ])])


export const mapFilterButtonAnimation = trigger('mapFilterButtonAnimation',[

  transition('* <=> *', [
    style({
      backgroundColor: 'black'
    })
  ])
])

import React, {Component} from 'react'
import ScreenEventItem from './ScreenNewsItem/'
import './ScreenNewsList.scss'

export default class ScreenEventList extends Component {
	state = {
		listOfNews: [
			{ id: 1,
				description: 'Ukraine detains dozens of far-right activists in Kiev',
				img: './../../../img/DummyImg/news-list/news-item-1.svg'
			},
			{ id: 2,
				description: 'Bishop stripped of citizenship for \'anti-Kiev activities\'',
				img: './../../../img/DummyImg/news-list/news-item-2.svg'
			},
			{ id: 3,
				description: 'Israeli citizens detained in Kiev airport have been released',
				img: './../../../img/DummyImg/news-list/news-item-3.svg'
			},
			{ id: 4,
				description: 'Epiphanius of Kiev: Let\'s build the future of Ukraine together',
				img: './../../../img/DummyImg/news-list/news-item-4.svg'
			},
			{
				id:5,
				description: 'Kiev reinforces military presence in Donbass — Russia\'s envoy',
				img: './../../../img/DummyImg/news-list/news-item-5.svg'
			},
			{ id: 6,
				description: 'Ukraine detains dozens of far-right activists in Kiev',
				img: './../../../img/DummyImg/news-list/news-item-1.svg'
			},
			{ id: 7,
				description: 'Bishop stripped of citizenship for \'anti-Kiev activities\'',
				img: './../../../img/DummyImg/news-list/news-item-2.svg'
			},
			{ id: 8,
				description: 'Israeli citizens detained in Kiev airport have been released',
				img: './../../../img/DummyImg/news-list/news-item-3.svg'
			},
			{ id: 9,
				description: 'Epiphanius of Kiev: Let\'s build the future of Ukraine together',
				img: './../../../img/DummyImg/news-list/news-item-4.svg'
			},
		]
	}
	
	renderItems (arr) {
		return arr.map((item) => {
			const {id, description, img} = item
			return (
				<ScreenEventItem
					key={id}
					description = {description}
					img = {img}/>
			)
		})
	}
	
	render () {
		const items = this.renderItems(this.state.listOfNews)
		return (
			<section className={'screenNewsList'}>
				{items}
			</section>
		)
	}
}
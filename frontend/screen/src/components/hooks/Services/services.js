import React, {Component} from 'react'
import BusinessItem from '../../BusinessItem'
import '../../../styles/hooks.scss'

const businesses = [
  {
    id: 1,
    title: 'Service-1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta\n' +
    '              praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.',
    photo: 'https://foodcity.ru/storage/services/August2018/HHEX6ItB8AM42tyUAR5g.jpg',
    address: 'Address-1'
  },

  {
    id: 2,
    title: 'Service-2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta\n' +
    '              praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.',
    photo: 'https://teplyca.com.ua/wp-content/uploads/2018/04/benef-spa.jpg',
    address: 'Address-2'
  },

  {
    id: 3,
    title: 'Service-3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta\n' +
    '              praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.',
    photo: 'https://stirka.ua/images/otraslevie_resheniya/kommercheskaya_big.jpg',
    address: 'Address-3'
  }
]

class Services extends Component {
  render () {
    const businessList = businesses.map((business) => {
      return <BusinessItem key={business.id} business={business}/>
    })
    return (
      <>
        <h1>Services</h1>
        <div className="businesses-list">
          {businessList}
        </div>
      </>
    )
  }
}

export default Services
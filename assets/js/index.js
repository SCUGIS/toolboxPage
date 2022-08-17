const config = {
 jsonapi: {
   base: 'https://gis.scu.edu.tw/jsonapi?id=1zTXQUPXSY1OuL5rAMX_5CKWCCWTeQtXT9LTN7R_aIT4',
   services: '&sheet=service',
   codes: '&sheet=code',
 },
 services: [],
 codes: [],
}


const init = async () => {
  const services = await $.ajax({
    url: `${config.jsonapi.base}${config.jsonapi.services}`,
    type: 'GET',
  })

  const codes = await $.ajax({
    url: `${config.jsonapi.base}${config.jsonapi.codes}`,
    type: 'GET',
  })


  config.codes = codes.rows
  config.services = services.rows

  await render(0, config.services)
}

const render = async (type, services) => {
  const base = $('.base')
  for (const service of services) {
    const dom = base.clone()

    switch (type) {
      case 0:
        dom.removeClass('base')
        dom.find('.base-name').text(service.name)
        dom.find('.base-description').text(service.description)
        dom.find('.base-image').attr('src', service.image)
        dom.find('.base-path').attr('href', service.path)
        dom.find('.base-author').text(service.author)

        $('.page').append(dom)
        break
      case 1:
        break
      default:
    }
  }
}

init()

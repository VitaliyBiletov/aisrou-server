const _ = require('lodash')

async function formatedDataFromTable(model, exclude=[]){
  const rows = await model.findAll({attributes:{exclude:exclude}})
  const listFields = _.invert(model.fieldAttributeMap)

  if (exclude.length > 0){
    exclude.forEach(e=>{
      if (listFields.hasOwnProperty(e)){
        delete listFields[e]
      }
    })
  }

  const fields = Object.entries(listFields).map(d=>{
    return {name: d[0], title: d[1]}
  })

  const list = rows.map(d=>{
    return {id: d.id, fieldsData: fields.map(f=>{
        return {name: f.name, value: f.id, title: d[f.name]}
      })}
  })

  return {fields: fields, data: list}
}

module.exports = {formatedDataFromTable}
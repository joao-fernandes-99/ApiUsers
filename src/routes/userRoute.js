const UsersModel = require('../models/users')


const userRoute = (app) =>{
    app.route('/users/:id?')
        .get(async (req, res) =>{
            const {id} = req.params
            console.log(id)
            const query ={}

            if(id){
                query._id = id
            }
            try{
                const users = await UsersModel.find(query)
                return res.send({users})
            }
            catch(err){
               return res.status(400).send(err)
            }
           
        })
        .post(async (req,res)=>{
            try{
                const user = new UsersModel(req.body)
                await user.save()

                return res.status(201).send('Usuario criado com sucesso......')
            }catch(err){
                return res.status(400).send(err)
            }
        })
        .put(async (req,res)=>{
            const {id} = req.params

            if(!id){
                return res.status(400).send({error:'ID do usuario é nescessaria'})
            }
            try{
                const updateUser = await UsersModel.findOneAndUpdate({_id: id}, req.body,{
                    new: true,
                })

                if(updateUser){
                    return res.status(200).send('Usuario Atualizado com sucesso....')
                }

                return res.status(400).send({error: 'Não foi possivel atualizar as informações do usuario'})
            }catch(error){
                return res.status(400).send(error)
            }
        })
        .delete(async (req, res)=>{
            const {id} = req.params

            if(id){

                try{
                    const deleteUser = await UsersModel.deleteOne({_id: id})
                    if(deleteUser.deletedCount){
                        return res.status(200).send('Usuario deletado com sucesso')
    
                    }
                    return res.status(400).send('Não foi possivel deletar o usuario')
                }catch(error){
                    res.send(error);
                }
           
            }else{
                return res.status(400).send('O Parametro ID não pode ser nulo')
            }
        })


}

module.exports = userRoute
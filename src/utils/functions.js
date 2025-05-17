export const convertFullName =(name,surname)=>{
    return `${name} ${surname}`

}

export const getInitials=(name,surname)=>{
    //ad ve soyadın ilk harglerini al büyük harfe çevir
    const nameInitial = name.trim()[0].toUpperCase()
    const surnameInitial = surname.trim()[0].toUpperCase()

    return nameInitial + surnameInitial
}

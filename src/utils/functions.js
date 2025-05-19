export const convertFullName = (name, surname) => {
  const capitalize = (word) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  return `${capitalize(name)} ${capitalize(surname)}`;
};
export const getInitials=(name,surname)=>{
    //ad ve soyadın ilk harglerini al büyük harfe çevir
    const nameInitial = name.trim()[0].toUpperCase()
    const surnameInitial = surname.trim()[0].toUpperCase()

    return nameInitial + surnameInitial
}

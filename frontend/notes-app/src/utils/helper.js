export const validateEmail = (email)=>{
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    return regex.test(email);
}
// taking first letter from user name
export const getInitials = (name)=>{
    if(!name) return ""
    const words = name.split(" "); // words = ["Ajay","Kumar"]
    let initials = "";
    for(let i =0;i<Math.min(words.length,2);i++){
        initials += words[i][0];  // Ajay Kumar -> AK
    }
    return initials.toUpperCase();  // AK
}
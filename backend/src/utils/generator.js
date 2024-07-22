const faker = require('@faker-js/faker').faker

const generatePatients = (count)=>{
    console.log('echo')
    const patients = []
    faker.date.past()
    while(count!=0){
        patients.push(
            {
                username: faker.internet.userName(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                password: faker.internet.password(),
                dob: faker.date.past({years: 30,refDate: new Date(2000, 0, 1)}).toISOString().split('T')[0]
            }
        )
        count-=1
    }
    return patients;
}

const generateStaffs = (count, role)=>{
    const staffs = []
    faker.date.past()
    while(count!=0){
        staffs.push(
            {
                username: faker.internet.userName(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                role: role,
                password: faker.internet.password(),
                centerCenterId: '1234',
                status: 'active',
            }
        )
        count-=1
    }
    return staffs;
}

module.exports = {generatePatients, generateStaffs}
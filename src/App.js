import { DB } from "./DB.js";

const App = {
    signup: async function(passkey) {
        return (await DB.isAdmin(passkey));
    },
    change_passkey: async function (prevpasskey, newpasskey) {
        if (!(await DB.isAdmin(prevpasskey)))
        {
            console.error("Invalid passkey!");
            return;
        }

        await DB.changePasskey(newpasskey);
    },
    add_repair: async function (passkey) {
        if (!(await DB.isAdmin(passkey)))
        {
            console.error("Invalid passkey!");
            return;
        }

        return (await DB.insertData());
    },
    change_repair_status: async function (passkey, id, done) {
        if (!(await DB.isAdmin(passkey)))
        {
            console.error("Invalid passkey!");
            return;
        }
        await DB.updateData(id, done);
    },
    delete_repair: async function (passkey, id) {
        if (!(await DB.isAdmin(passkey)))
        {
            console.error("Invalid passkey!");
            return;
        }
        await DB.deleteData(id);
    },
    delete_done_repairs: async function (passkey) {
        if (!(await DB.isAdmin(passkey)))
        {
            console.error("Invalid passkey!");
            return;
        }
        (await App.get_all_repairs()).forEach(async (value) => {
            if (value.data().done === true)
                await this.delete_repair(passkey,value.id);
        })
    },
    get_all_repairs: async function () {
        return (await DB.getAllData());
    }
};

window.App = App;
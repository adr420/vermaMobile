
const repairsViewElem = document.querySelector("[data-repairs]");
const delete_done_btn = document.querySelector(".delete-done");
const new_repair_btn = document.querySelector(".new-repair");
const refresh_btn = document.querySelector(".refresh");


async function RepairView({ id, done }) {
    const repair = document.createElement("div");
    repair.classList.add("repair");
    repair.textContent = id;

    const doneBox = document.createElement("input")
    doneBox.type = "checkbox";
    doneBox.checked = done;
    doneBox.disabled = !(await App.signup(localStorage.getItem("vermaMobKey")));
    doneBox.classList.add("check");
    doneBox.onclick = async (e) => {
        await App.change_repair_status(localStorage.getItem("vermaMobKey"),id,doneBox.checked);
    }


    const delBtn = document.createElement("button");
    delBtn.classList.add("del-btn");
    delBtn.textContent = "Del";
    delBtn.onclick = async (e) => {
        await App.delete_repair(localStorage.getItem("vermaMobKey"),id);
        refresh_repairs();
    }

    repair.appendChild(doneBox);
    repair.appendChild(delBtn);
    repairsViewElem.appendChild(repair);
}

async function render_repairs() {
    const rep_snapshot = await App.get_all_repairs();

    rep_snapshot.forEach(async (value) => {
        if (value.id == "count") return;
        await RepairView({ id: value.id, done: value.data().done });
    });
}

function refresh_repairs()
{
    repairsViewElem.innerHTML = "";
    render_repairs();
}

function init() {
    render_repairs();
    delete_done_btn.onclick = async (e) => {
        await App.delete_done_repairs(localStorage.getItem("vermaMobKey"));
        repairsViewElem.innerHTML = "";
        await render_repairs();
    }
    new_repair_btn.onclick = async (e) => {
        await App.add_repair(localStorage.getItem("vermaMobKey"));
        refresh_repairs();
    }
    refresh_btn.onclick = (e) => {
        refresh_repairs();
    }
}

window.onload = init;
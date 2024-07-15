
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
        await App.change_repair_status(localStorage.getItem("vermaMobKey"), id, doneBox.checked);
    }


    const delBtn = document.createElement("button");
    delBtn.classList.add("del-btn");
    delBtn.textContent = "Del";
    delBtn.onclick = async (e) => {
        await App.delete_repair(localStorage.getItem("vermaMobKey"), id);
        await render_repairs();
    }

    repair.appendChild(doneBox);
    repair.appendChild(delBtn);
    repairsViewElem.appendChild(repair);
}

let render_pending = false;
async function render_repairs() {
    const rep_snapshot = await App.get_all_repairs();
    if (repairsViewElem.innerHTML == "" && rep_snapshot > 1) render_pending = false;

    if (render_pending)
        return;
    render_pending = true;
    repairsViewElem.innerHTML = "";

    let i = 0;
    rep_snapshot.forEach(async (value) => {
        if (value.id == "count") return;
        await RepairView({ id: value.id, done: value.data().done });

        if (i == rep_snapshot.size - 2)
            render_pending = false; // async rendering done
        i++;
    });
}

function init() {
    render_repairs();
    delete_done_btn.onclick = async (e) => {
        await App.delete_done_repairs(localStorage.getItem("vermaMobKey"));
        await render_repairs();
    }
    new_repair_btn.onclick = async (e) => {
        await App.add_repair(localStorage.getItem("vermaMobKey"));
        await render_repairs();
    }
    refresh_btn.onclick = async (e) => {
        await render_repairs();
    }
}

window.onload = init;
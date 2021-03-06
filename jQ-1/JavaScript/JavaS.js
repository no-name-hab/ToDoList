let todoListState = {list: []}; //В этом масиве будут хранится (id, text) элементов!!!
//-------------------
document.getElementById('important_1').addEventListener("click", important_click);
document.getElementById('completed_1').addEventListener("click", completed_click);
document.getElementById('all_1').addEventListener("click", all_click);
document.getElementById('Filter_text').onkeyup = filter_onkeyup;
document.getElementById('add_glob').addEventListener("click", add_click);
//-------------------
let list_block = document.getElementById("be-all");
let text_id = document.getElementById("Text_note");

let inp_value, lab_class, lab_length, div_class, div_length, no_class, no_length, on_class, on_length, number_all = 0;

function add_click() {
    div_class = document.getElementsByClassName("rather");
    div_length = div_class.length;

    no_class = document.getElementsByClassName("no");
    no_length = no_class.length;

    lab_class = document.getElementsByClassName("label");
    lab_length = lab_class.length;

    on_class = document.getElementsByClassName("on");
    on_length = on_class.length;

    inp_value = text_id.value;
    if (text_id.value.length < 3) {
        alert("text < 3")
    } else {
        list_block.innerHTML += `<center>
    <div class="rather" >
        <table>
            <tr><td>
            <button class="no"><img src="Css/add.png" class="png"></button>
            </td><td>
                <div class="colo">
                    <textarea class="label" readonly style="resize: none; color: black;"></textarea>
                </div>
                </td><td>
                    <button class="on" style=""><img src="Css/trash.png" class="png_1"></button></td>
        </tr>
        </table><br>
    </div>
</center>`;
        div_class[div_length].id = "ElementId_" + number_all;
        //----CLASS_no-----\\
        for (let num_no = 0; num_no < no_length + 1; num_no++) {
            no_class[num_no].addEventListener('click', no_click);
        }
        //----CLASS_label-----\\
        lab_class[lab_length].id = "ElementsClass_" + number_all;
        for (let num_lab = 0; num_lab < lab_length + 1; num_lab++) {
            lab_class[num_lab].addEventListener('click', lab_click);
        }
        //----CLASS_on-----\\
        for (let num_on = 0; num_on < on_length + 1; num_on++) {
            on_class[num_on].addEventListener('click', on_click);
        }
        todoListState.list.push({id: "ElementId_" + number_all, text: inp_value});
        document.getElementById("ElementsClass_" + number_all).innerHTML = inp_value;
        text_id.value = '';
        number_all++;
    }
}

//-- Фильрация текста на странице!!!
let input_value, todoFilter, list_length, list_id, true_text, dead_trick, element_ID;

function filter_onkeyup() {
    document.getElementById("hid_elem").innerHTML = "";
    input_value = document.getElementById("Filter_text").value; //получаем значение из поля в html
    todoFilter = document.getElementById("Filter_text").value;
    list_length = todoListState.list.length;

    if (input_value.length < 3) {

        for (let ab = 0; ab < list_length; ab++) {
            list_id = todoListState.list[ab].id;
            document.getElementById(list_id).style.display = 'block';
        }
    }
    if (input_value.length >= 3) {
        true_text = todoListState.list.filter(it => it.text.includes(todoFilter));
        dead_trick = true_text.length;

        for (let ab = 0; ab < list_length; ab++) {
            list_id = todoListState.list[ab].id;
            document.getElementById(list_id).style.display = 'none';
        } //Элементам присваиваем display none!!!

        if (dead_trick !== 0) {
            true_text = todoListState.list.filter(it => it.text.includes(todoFilter));
            element_ID = true_text.map(function (item) {
                return item.id
            });
            let dead_trick = true_text.length;
            for (let ac = 0; ac < dead_trick; ac++) {
                document.getElementById(element_ID[ac]).style.display = 'block';
            }
        }//Найденому совпадению текста присваиваем display block
        else {
            document.getElementById("hid_elem").innerHTML = "ОШИБКА ПОИСКА";
        }
    }
}

// При нажатии на кнопку, текст заметки выделяеться!!!
function no_click() {
    let child = this.closest('tr').children[1];
    let child_1 = child.children[0];
    let style_child = child_1.children[0];
    console.log(style_child);

    if (style_child.style.color === "black") {
        style_child.style.cssText = "color: green; font-weight: bold";

    } else if (style_child.style.color === "green") {
        style_child.style.cssText = "color: black; font-weight: normal";

    } else {
        alert("Это задание выполненне!!!")
    }
}

// При нажатии на кнопку, добавляеться стиль элементу!!!
function lab_click() {
    let style_1 = this.style.textDecoration;

    if (style_1 === "" || style_1 === "none") {
        this.style.cssText = "color: dimgray; text-decoration: line-through; font-weight: normal";
    } else {
        this.style.cssText = "color: black; text-decoration: none";
    }
}

// При нажатии на кнопку, удоляеться элемент с масива и страницы!!!
function on_click() {
    let id_this = this.closest('.rather').id;

    for (let x = 0; x < todoListState.list.length; x++) {
        if (id_this === todoListState.list[x].id) {
            todoListState.list.splice(x, 1)
        }
    }
    this.closest("center").remove();
}

//--(Важные!!!)
function important_click() {
    let person_inpor = document.getElementsByClassName('label');
    let bolt = person_inpor.length;

    for (var x = 0; x < bolt; x++) {
        if (person_inpor[x].style.color === "black" || person_inpor[x].style.color === "dimgray") {
            let font_you = person_inpor[x].closest("div.rather");
            font_you.style.display = "none";
        }
        if (person_inpor[x].style.color === "green") {
            let font_you = person_inpor[x].closest("div.rather");
            font_you.style.display = "block";
        }
    }
}

//--(Выполненые!!!)
function completed_click() {
    let person_inpor = document.getElementsByClassName('label');
    let bolt = person_inpor.length;

    for (var x = 0; x < bolt; x++) {
        if (person_inpor[x].style.color === "black" || person_inpor[x].style.color === "green") {
            let font_you = person_inpor[x].closest("div.rather");
            font_you.style.display = "none";
        }
        if (person_inpor[x].style.color === "dimgray") {
            let font_you = person_inpor[x].closest("div.rather");
            font_you.style.display = "block";
        }
    }
}

//--(Все!!!)
function all_click() {
    let person_inpor = document.getElementsByClassName('label');
    let bolt = person_inpor.length;

    for (var x = 0; x < bolt; x++) {
        let font_you = person_inpor[x].closest("div.rather");
        font_you.style.display = "block";
    }
}
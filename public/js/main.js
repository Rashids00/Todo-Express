function updatestatus(itemid) {
    console.log("Updating status for item:", itemid);
    fetch('/update/' + itemid, { method: 'PUT' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Not ok')
            }
            console.log('Status updated successfully');
            const itemCheckbox = document.querySelector(`input[name="completed"][data-id="${itemid}"]`);
            const itemLabel = document.querySelector(`label[data-id="${itemid}"]`);
            if (itemCheckbox.checked) {
                itemLabel.style.textDecoration = 'line-through';
            } else {
                itemLabel.style.textDecoration = 'none';
            }
        })
        .catch(error => {
            console.log(error);
        });
};

function confirmDelete(dataid) {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteitem(dataid);
    }
  }


function deleteitem(dataid)
{
    fetch('/delete/' + dataid,{method: 'DELETE', headers:{'Content-Type': 'application/json'}})
    .then(response => {
        if(!response.ok)
        {
            throw new Error('Not ok')
        }
        location.reload()
    }).catch(error => {
        console.log(err)
    })
}
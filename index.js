document.addEventListener("DOMContentLoaded", function() {
  let myLeads = []
  const inputEl = document.getElementById("input-el")
  const inputBtn = document.getElementById("input-btn")
  const ulEl = document.getElementById("ul-el")
  const deleteBtn = document.getElementById("delete-btn")
  const tabBtn = document.getElementById("save-tab")
  const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

  if (leadsFromLocalStorage) {
      myLeads = leadsFromLocalStorage
      render(myLeads)
  }

  tabBtn.addEventListener("click", function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          myLeads.push(tabs[0].url)
          localStorage.setItem("myLeads", JSON.stringify(myLeads))
          render(myLeads)
      })
  })

  inputBtn.addEventListener("click", function() {
      if (inputEl.value.trim() !== "") {
          myLeads.push(inputEl.value.trim())
          inputEl.value = ""
          localStorage.setItem("myLeads", JSON.stringify(myLeads))
          render(myLeads)
      } else {
          alert("Please enter a valid lead")
      }
  })

  deleteBtn.addEventListener("dblclick", function() {
      localStorage.clear()
      myLeads = []
      render(myLeads)
  })

  function render(leads) {
      let listItems = ""
      for (let i = 0; i < leads.length; i++) {
          listItems += `
              <li>
                  <a target='_blank' href='${leads[i]}'>
                      ${leads[i]}
                  </a>
              </li>
          `
      }
      ulEl.innerHTML = listItems
  }
})
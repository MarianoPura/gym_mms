document.addEventListener('DOMContentLoaded', function() {
    const newMember = document.querySelector('#newMember');
    const newMemberModal = document.querySelector('.newMemberModal');
    const editMemberModal = document.querySelector('.editMemberModal');
    const addBtn = document.querySelector('#addBtn');
    const tableBody = document.querySelector('#tableBody');
    const editMember = document.querySelector('#editMember');
    const search = document.querySelector('#search');
    const pagination = document.querySelector('#pagination');
    const branchSelectNew = document.querySelector('#branch-new');
    const branchSelectEdit = document.querySelector('#branch-edit');

    const video = document.getElementById('webcam');
    const videoCanvas = document.getElementById('snapshotCanvas');
    const preview = document.getElementById('snapshotPreview');
    const captureBtn = document.getElementById('captureBtn');
    const photoData = document.getElementById('photoData');
    const ctx = videoCanvas.getContext('2d');

    const videoEdit = document.getElementById('webcam-edit');
    const videoCanvasEdit = document.getElementById('snapshotCanvas-edit');
    const previewEdit = document.getElementById('snapshotPreview-edit');
    const captureBtnEdit = document.getElementById('captureBtn-edit');
    const photoDataEdit = document.getElementById('photoData-edit');
    const ctxEdit = videoCanvasEdit.getContext('2d');

    const contactNum = document.getElementById("contactNum");
    const e_contactNum = document.getElementById("e_contact_number");
    const cardNum = document.getElementById("cardNum");
    const contactNumEdit = document.getElementById("contactNum-edit");
    const cardNumEdit = document.getElementById("cardNum-edit");
    const e_contact_number = document.getElementById("e_contact_number-edit");

    const cameraModal = document.querySelector('#cameraModal');
    const qrCode = document.querySelector('#qrCode');
    const memberNameQr = document.querySelector('#memberName-qr');
    const closeCameraModalBtn = document.querySelector('#closeCameraModal');

    let currentPage = 1;
    const limit = 10;

    function view (query = '', page = 1) {
        currentPage = page;
        tableBody.innerHTML = '';
        fetch(`scripts/view.php?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`)
        .then(response => response.json())
        .then(res => {
            const rows = res.data;
            const total = res.total;
            const totalPages = Math.ceil(total / limit);

            rows.forEach(member => {
                const row = document.createElement('tr');
                row.className = 'hover:bg-gray-50';
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${member.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${member.card_no}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${member.fname} ${member.lname}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${member.contact_no}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${member.membership_date}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">

                    <button class="cameraBtn bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200"
                            data-id="${member.id}"
                            data-fname="${member.fname}"
                            data-lname="${member.lname}"
                            data-qr="data:image/png;base64,${res.qr}"
                        >Camera</button>

                        <button class="editBtn bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200"
                            data-id="${member.id}"
                            data-fname="${member.fname}"
                            data-lname="${member.lname}"
                        >Edit</button>
                        
                        <button class="downloadBtn bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200"
                            data-id="${member.id}"
                            data-fname="${member.fname}"
                            data-lname="${member.lname}"
                            data-membership="${member.membership_date}"
                            data-contact="${member.contact_no}"
                            data-contactperson="${member.E_contact_person}"
                            data-cardNum="${member.card_no}"
                            data-branch="${member.branch_name}"
                            data-branch-short-num="${member.branch_short_num}"
                        >Download</button>

                        <button class="printBtn bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200"
                            data-fname="${member.fname}"
                            data-lname="${member.lname}"
                            data-membership="${member.membership_date}"
                            data-contact="${member.contact_no}"
                            data-contactperson="${member.E_contact_person}"
                            data-id="${member.id}"
                            data-cardnum="${member.card_no}"
                            data-branch="${member.branch_name}"
                            data-branch-short-num="${member.branch_short_num}"
                        >Print</button>
                    </td>
                `;
                tableBody.appendChild(row);
               
            })

      


        pagination.innerHTML = '';
            if (page > 1) {
                const prev = document.createElement('button');
                prev.textContent = "Previous";
                prev.className = "px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200";
                prev.onclick = () => view(query, page - 1);
                pagination.appendChild(prev);
            }

            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.textContent = i;
                if (i === page) {
                    btn.className = "px-3 py-2 bg-blue-600 border border-blue-600 rounded-lg text-sm font-medium text-white";
                    btn.disabled = true;
                } else {
                    btn.className = "px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200";
                }
                btn.onclick = () => view(query, i);
                pagination.appendChild(btn);
            }

            if (page < totalPages) {
                const next = document.createElement('button');
                next.textContent = "Next";
                next.className = "px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200";
                next.onclick = () => view(query, page + 1);
                pagination.appendChild(next);
            }
                document.querySelectorAll('.editBtn').forEach(btn => {
                btn.addEventListener('click', function(e){
                    const memberId = this.dataset.id;
                    const fname = this.dataset.fname;
                    const lname = this.dataset.lname;
                    document.querySelector('#memberName').innerHTML = `${fname} ${lname}`
                    
                    // Fetch all member details from database
                    fetch(`scripts/get_member.php?id=${memberId}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            const member = data.data;
                            
                            // Populate all form fields with fetched data
                            document.querySelector('#memberId').value = member.id;
                            document.querySelector('#fName-edit').value = member.fname;
                            document.querySelector('#lName-edit').value = member.lname;
                            document.querySelector('#contactNum-edit').value = member.contact_no;
                            document.querySelector('#e_contact_person-edit').value = member.E_contact_person;
                            document.querySelector('#e_contact_number-edit').value = member.e_contact_number;
                            document.querySelector('#cardNum-edit').value = member.card_no;
                            document.querySelector('#branch-edit').value = member.branch;
                            
                            // Format and set membership date
                            if (member.membership_date) {
                                const dateStr = member.membership_date;
                                let formattedDate = '';
                                
                                // Handle different date formats
                                if (dateStr.includes(',')) {
                                    // Format: "Feb 06, 2025" or "May, 07, 2025"
                                    const parts = dateStr.replace(/,/g, '').split(' ');
                                    if (parts.length >= 3) {
                                        const month = parts[0];
                                        const day = parts[1].padStart(2, '0');
                                        const year = parts[2];
                                        const monthNum = new Date(Date.parse(month + " 1, 2000")).getMonth() + 1;
                                        formattedDate = `${year}-${monthNum.toString().padStart(2, '0')}-${day}`;
                                    }
                                } else {
                                    // Format: "AUG 22, 2025" or similar
                                    const parts = dateStr.split(' ');
                                    if (parts.length >= 3) {
                                        const month = parts[0];
                                        const day = parts[1].replace(',', '').padStart(2, '0');
                                        const year = parts[2];
                                        const monthNum = new Date(Date.parse(month + " 1, 2000")).getMonth() + 1;
                                        formattedDate = `${year}-${monthNum.toString().padStart(2, '0')}-${day}`;
                                    }
                                }
                                
                                document.querySelector('#membershipDate-edit').value = formattedDate;
                            }
                            
                            // Load existing photo if available
                            const currentPhotoImg = document.querySelector('#currentPhoto-edit');
                            if (member.photo && member.photo !== 'images/members/.png' && !member.photo.endsWith('scripts/images/members/.png')) {
                                // Add timestamp to prevent caching
                                const timestamp = new Date().getTime();
                                currentPhotoImg.src = member.photo + '?t=' + timestamp;
                                currentPhotoImg.style.display = 'block';
                            } else {
                                currentPhotoImg.src = '';
                                currentPhotoImg.style.display = 'block';
                                currentPhotoImg.alt = 'No photo available';
                            }
                            
                            // Set the editMemberForm reference
                            editMemberForm = document.getElementById('editMember');
                            editMemberModal.style.display = "flex";
                        } else {
                            console.error('Error fetching member data:', data.error);
                            alert('Error loading member data. Please try again.');
                        }
                    })
                    .catch(err => {
                        console.error('Error:', err);
                        alert('Error loading member data. Please try again.');
                    });
                });


        });
        }).catch(err=>console.error(err));

        fetch('scripts/get.php')
        .then(response => response.json())
        .then(data => {
            branchSelectNew.innerHTML = '';
            branchSelectEdit.innerHTML = '';

            data.forEach(branch => {
            const option = document.createElement('option');
            option.value = branch.id;
            option.textContent = branch.name;
            branchSelectNew.appendChild(option);
            branchSelectEdit.appendChild(option.cloneNode(true));
            });

        }).catch(err=>console.error(err));
    }

    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("downloadBtn")) {
            const fname = e.target.dataset.fname;
            const lname = e.target.dataset.lname;
            const membership = e.target.dataset.membership;
            const contact = e.target.dataset.contact;
            const contactPerson = e.target.dataset.contactperson;
            const id = e.target.dataset.id;
            const card_no = e.target.dataset.cardnum;
            const branchShortNum = e.target.dataset.branchShortNum;

            console.log('Download button clicked:', { id, card_no, fname, lname });
            const branch = e.target.dataset.branch;
            generateID(id, card_no, fname + " " + lname, membership, contactPerson, contact, branch, branchShortNum, "download");
        }

        else if (e.target.classList.contains("printBtn")) {
            const fname = e.target.dataset.fname;
            const lname = e.target.dataset.lname;
            const membership = e.target.dataset.membership;
            const contact = e.target.dataset.contact;
            const contactPerson = e.target.dataset.contactperson;
            const id = e.target.dataset.id;
            const card_no = e.target.dataset.cardnum;
            const branchShortNum = e.target.dataset.branchShortNum;
        // call generateID for print only
        console.log('Print button clicked:', { id, card_no, fname, lname });
        const branch = e.target.dataset.branch;
        generateID(id, card_no, fname + " " + lname, membership, contactPerson, contact, branch, branchShortNum, "print"); 
        }

        else if (e.target.classList.contains("cameraBtn")) {
            const qr = e.target.dataset.qr;
            qrCode.src = qr;
            cameraModal.style.display = 'flex';
            if (memberNameQr) {
                memberNameQr.textContent = `${e.target.dataset.fname} ${e.target.dataset.lname}`;
            }
        }
    });


    const confirmModal = document.getElementById('confirmModal');
   const confirmSubmit = document.getElementById('confirmSubmit');
   const confirmCancel = document.getElementById('confirmCancel');
   let newMemberForm = null;
   
   newMember.addEventListener('submit', function(e) {
        e.preventDefault();
        newMemberForm = this; // Store the form reference
        
        // Show custom confirmation modal
        confirmModal.classList.remove('hidden');
   });
   
   // Handle add member confirm button click
   confirmSubmit.addEventListener('click', function() {
        confirmModal.classList.add('hidden');
        const form = new FormData(newMemberForm);
        fetch('scripts/create.php', {
            method: 'POST',
            body: form
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                // Hide the modal first
                newMemberModal.style.display = "none";
                
                // Show success message after a small delay for smooth transition
                setTimeout(() => {
                    alert(data.message);
                }, 50);
                
                view();
                newMember.reset();
                document.querySelectorAll('.error').forEach(el => {
                    el.classList.remove('error');
                });
                previewEdit.src = "images/Empty.png";
            }
            if (!data.success) {
                if(data.invalidContactNum){
                    const contactNumInput = document.querySelector('#contactNum');
                    contactNumInput.classList.add('error');
                    console.log(contactNumInput)

                    contactNumInput.addEventListener('click', function(e){
                        contactNumInput.classList.remove('error');
                    });
                    alert(data.message);
                }
                else if(data.invalidName){
                    const fnameInput = document.querySelector('#fName');
                    const lnameInput = document.querySelector('#lName');
                    fnameInput.classList.add('error');
                    lnameInput.classList.add('error');

                    fnameInput.addEventListener('click', function(e){
                        fnameInput.classList.remove('error');
                    });
                    lnameInput.addEventListener('click', function(e){
                        lnameInput.classList.remove('error');
                    })
                    alert(data.message);

                }
                else if (data.invalidEContactNum){
                    const eContactNumInput = document.querySelector('#e_contact_number');
                    eContactNumInput.classList.add('error');

                    eContactNumInput.addEventListener('click', function(e){
                        eContactNumInput.classList.remove('error');
                    })
                    alert(data.message);
                }
                else if (data.invalidDate){
                    const membershipDateInput = document.querySelector('#membershipDate');
                    membershipDateInput.classList.add('error');

                    membershipDateInput.addEventListener('click', function(e){
                        membershipDateInput.classList.remove('error');
                    })
                    alert(data.message);
                }
                else if (data.invalidEContactPerson){
                    const eContactPersonInput = document.querySelector('#e_contact_person');
                    eContactPersonInput.classList.add('error');

                    eContactPersonInput.addEventListener('click', function(e){
                        eContactPersonInput.classList.remove('error');
                    })
                    alert(data.message);
                }
                else if(data.nullPhoto){
                    alert(data.message);
                    photoData.classList.add('error');
                    video.classList.add('error');
                }
            }
        }).catch(err=>console.error(err));
    });


    editMember.addEventListener('submit', function(e){
        e.preventDefault();
        const formData = new FormData();

        Array.from(editMember.elements).forEach(el => {
            if (el.name && el.value && el.type !== "button" && el.type !== "submit") {
                formData.append(el.name, el.value);
            }
        });

        formData.append('id', document.getElementById('memberId').value);

        if (photoDataEdit.value) { 
            formData.append('photo', photoDataEdit.value);
        }

        fetch('scripts/update.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {

            if (data.success) {
                alert(data.message);
                view(); 
                editMemberModal.style.display = "none";
                editMember.reset();
                document.querySelectorAll('.error').forEach(el => {
                    el.classList.remove('error');
                });
                previewEdit.src = "images/Empty.png";;
                // Clear the current photo display
                const currentPhotoImg = document.querySelector('#currentPhoto-edit');
                if (currentPhotoImg) {
                    currentPhotoImg.src = '';
                    currentPhotoImg.style.display = 'none';
                }
                // Reset webcam display
                document.querySelector('#webcam-edit').style.display = 'block';
            }

            if (!data.success){
                if(data.invalidContactNum){
                    const contactNumInput = document.querySelector('#contactNum-edit');
                    contactNumInput.classList.add('error');
                    console.log(contactNumInput)

                    contactNumInput.addEventListener('click', function(e){
                        contactNumInput.classList.remove('error');
                    });
                    alert(data.message);
                }
                else if(data.invalidName){
                    const fnameInput = document.querySelector('#fName-edit');
                    const lnameInput = document.querySelector('#lName-edit');
                    fnameInput.classList.add('error');
                    lnameInput.classList.add('error');

                    fnameInput.addEventListener('click', function(e){
                        fnameInput.classList.remove('error');
                    });
                    lnameInput.addEventListener('click', function(e){
                        lnameInput.classList.remove('error');
                    });
                    alert(data.message);

                }
                else if (data.invalidEContactNum){
                    const eContactNumInput = document.querySelector('#e_contact_number-edit');
                    eContactNumInput.classList.add('error');

                    eContactNumInput.addEventListener('click', function(e){
                        eContactNumInput.classList.remove('error');
                    })
                    alert(data.message);
                }
                else if (data.invalidDate){
                    const membershipDateInput = document.querySelector('#membershipDate-edit');
                    membershipDateInput.classList.add('error');

                    membershipDateInput.addEventListener('click', function(e){
                        membershipDateInput.classList.remove('error');
                    })
                    alert(data.message);
                }
                else if(data.invalidEContactPerson){
                    const eContactPersonInput = document.querySelector('#e_contact_person-edit');
                    eContactPersonInput.classList.add('error');

                    eContactPersonInput.addEventListener('click', function(e){
                        eContactPersonInput.classList.remove('error');
                    })
                    alert(data.message);
                }
            }
        }).catch(err => console.error(err));
    });

    
     function generateID(id, card_no, name, membership, contactPerson, contactNo, branchName, branchShortNum, action = "download") {
        currentIdForModal = id; // Store ID for modal use
        const canvas = document.getElementById("idCanvas");
        const ctx = canvas.getContext("2d");

        const template = new Image();
        template.src = "images/armanis2.png";

        template.onload = async function() {
            // Load Montserrat font manually
            const montserrat = new FontFace("Montserrat", "url(Font/Montserrat-Bold.ttf)");
            await montserrat.load();
            document.fonts.add(montserrat);

            // Wait for all fonts
            await document.fonts.ready;

            ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

            const photo = new Image();
            const qr = new Image();
            photo.src = "scripts/images/members/" + id.replace(/\s+/g, "_") + ".png"; 
            qr.src = "scripts/images/qrcodes/" + card_no + ".png";

            let photoLoaded = false;
            let qrLoaded = false;
            let photoError = false;
            let qrError = false;

            function checkAndProceed() {
                if ((photoLoaded || photoError) && (qrLoaded || qrError)) {
                    // Draw photo if available, otherwise show placeholder
                    if (photoLoaded) {
                        const slotWidth = 160;  // width of photo slot
                        const slotHeight = 260.5; // height of photo slot
                        const dx = 25.7;        // slot x on template
                        const dy = 98.6;         // slot y on template

                        const photoAspect = photo.width / photo.height;
                        const slotAspect = slotWidth / slotHeight;

                        let sx, sy, sw, sh;

                        if (photoAspect > slotAspect) {
                            // photo is wider → crop left/right
                            sh = photo.height;
                            sw = sh * slotAspect;
                            sx = (photo.width - sw) / 2;
                            sy = 0;
                        } else {
                            // photo is taller → crop top/bottom
                            sw = photo.width;
                            sh = sw / slotAspect;
                            sx = 0;
                            sy = (photo.height - sh) / 2;
                        }

                        ctx.drawImage(photo, sx, sy, sw, sh, dx, dy, slotWidth, slotHeight);
                    } else {
                        const slotWidth = 160;
                        const slotHeight = 260.5;
                        const dx = 25.7;
                        const dy = 98.6;
                        
                        ctx.fillStyle = "#f0f0f0";
                        ctx.fillRect(dx, dy, slotWidth, slotHeight);
                        
                        ctx.strokeStyle = "#ccc";
                        ctx.lineWidth = 2;
                        ctx.strokeRect(dx, dy, slotWidth, slotHeight);
                        
                        ctx.fillStyle = "#666";
                        ctx.font = "14px Arial";
                        ctx.textAlign = "center";
                        ctx.fillText("Photo", dx + slotWidth/2, dy + slotHeight/2 - 10);
                        ctx.fillText("Missing", dx + slotWidth/2, dy + slotHeight/2 + 10);
                        ctx.textAlign = "left";
                    }

                    // Draw QR code if available, otherwise show placeholder
                    if (qrLoaded) {
                        ctx.drawImage(qr, 474.5, 249.5, 99, 105);
                    } else {
                        // Draw placeholder for missing QR code
                        ctx.fillStyle = "#f0f0f0";
                        ctx.fillRect(474.5, 249.5, 99, 105);
                        
                        ctx.strokeStyle = "#ccc";
                        ctx.lineWidth = 2;
                        ctx.strokeRect(474.5, 249.5, 99, 105);
                        
                        ctx.fillStyle = "#666";
                        ctx.font = "12px Arial";
                        ctx.textAlign = "center";
                        ctx.fillText("QR Code", 474.5 + 49.5, 249.5 + 47);
                        ctx.fillText("Missing", 474.5 + 49.5, 249.5 + 63);
                        ctx.textAlign = "left";
                    }

                    ctx.fillStyle = "#000";
                    ctx.textBaseline = "top";

                    // Add branch name below "ARMANI'S FITNESS"
                    ctx.fillStyle = "#FFF";
                    fitText(ctx, branchName.toUpperCase(), 105, 55, 300, "Arial", 15);
                    
                    // Add contact number to top right
                    ctx.textAlign = "right";
                    ctx.fillStyle = "#FFF";
                    fitText(ctx, branchShortNum + "-" + id, 580, 15, 150, "Montserrat", 30);
                    ctx.textAlign = "left";
                    
                    // Reset fill style for other text
                    ctx.fillStyle = "#000";

                    fitText(ctx, name, 355, 123.5, 200, "Montserrat", 16.5);
                    fitText(ctx, membership, 355, 144, 200, "Montserrat", 16.5);
                    fitText(ctx, contactPerson, 290, 189, 200, "Montserrat", 10);
                    fitText(ctx, contactNo, 290, 204, 200, "Montserrat", 10);

                    const dataUrl = canvas.toDataURL("image/png");

                    // Show warning modal if images are missing
                    if (photoError || qrError) {
                        let missingItems = [];
                        if (photoError) missingItems.push("member photo");
                        if (qrError) missingItems.push("QR code");
                        
                        showWarningModal(missingItems, action, dataUrl);
                        return;
                    }

                    executeAction(action, dataUrl, id);
                }
            }

            photo.onload = function() {
                photoLoaded = true;
                checkAndProceed();
            };

            photo.onerror = function() {
                photoError = true;
                console.warn("Member photo not found:", photo.src);
                checkAndProceed();
            };

            qr.onload = function() {
                qrLoaded = true;
                checkAndProceed();
            };

            qr.onerror = function() {
                qrError = true;
                console.warn("QR code not found:", qr.src);
                checkAndProceed();
            };
        };
    }


    function fitText(ctx, text, x, y, maxWidth, fontFamily, initialSize) {
        let fontSize = initialSize;
        ctx.font = fontSize + "px '" + fontFamily + "'";
        
        // Reduce font size until text fits
        while (ctx.measureText(text).width > maxWidth && fontSize > 10) {
            fontSize--;
            ctx.font = fontSize + "px '" + fontFamily + "'";
        }

         const sizeDiff = initialSize - fontSize;
         const yOffset = sizeDiff * 0.9;

        ctx.fillText(text, x, y + yOffset);
    }

    // Warning Modal Functions
    function showWarningModal(missingItems, action, dataUrl) {
        const modal = document.getElementById('warningModal');
        const itemsList = document.getElementById('missingItemsList');
        const actionType = document.getElementById('actionType');
        const continueBtn = document.getElementById('continueWarning');
        const cancelBtn = document.getElementById('cancelWarning');

        // Populate modal content
        itemsList.innerHTML = '';
        missingItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            itemsList.appendChild(li);
        });
        
        actionType.textContent = action;
        
        // Show modal
        modal.style.display = 'flex';
        
        // Handle continue button
        continueBtn.onclick = function() {
            modal.style.display = 'none';
            executeAction(action, dataUrl, getCurrentId());
        };
        
        // Handle cancel button
        cancelBtn.onclick = function() {
            modal.style.display = 'none';
        };
        
        // Close modal when clicking outside
        modal.onclick = function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    function executeAction(action, dataUrl, id) {
        if (action === "print") {
            const printWindow = window.open("", "_blank");
            const doc = printWindow.document;
            doc.head.innerHTML = "";
            doc.body.innerHTML = "";

            const style = doc.createElement("style");
            style.textContent = `
                @page {
                    size: 85.6mm 54mm;
                    margin: 0;
                }
                html, body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: fill;
                    display: block;
                    transform-origin: top left;
                }
                @media print {
                    @page {
                        margin: 0 !important;
                        size: 85.6mm 54mm;
                    }
                    html, body {
                        margin: 0 !important;
                        padding: 0 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    img {
                        width: 100% !important;
                        height: 100% !important;
                        object-fit: fill !important;
                        page-break-inside: avoid;
                    }
                }
            `;
            doc.head.appendChild(style);

            // Set document title to empty to remove header text
            doc.title = "";
            
            const img = doc.createElement("img");
            img.src = dataUrl;
            img.onload = () => {
                // Execute print command to hide headers/footers
                printWindow.focus();
                
                // Try to disable headers and footers programmatically
                setTimeout(() => {
                    printWindow.print();
                }, 100);
                
                printWindow.onafterprint = () => printWindow.close();
            };
            doc.body.appendChild(img);
        } else {
            const link = document.createElement("a");
            link.download = id.replace(/\s+/g, "_") + "_ID.png";
            link.href = dataUrl;
            link.click();
        }
    }


    const printCoverBtn = document.querySelector('#printCoverBtn');
    if (printCoverBtn) {
        printCoverBtn.addEventListener('click', () => {
            const img = new Image();
            img.src = "images/cover.png";
            img.onload = () => {
                const canvas = document.querySelector('#idCanvas');
                const ctx = canvas.getContext('2d');

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const dataUrl = canvas.toDataURL("image/png");

                executeAction("print", dataUrl, "cover");
            }
            img.onerror = () => alert("Cover image not found");
        });
        
    }

    if (closeCameraModalBtn) {
        closeCameraModalBtn.addEventListener('click', function() {
            cameraModal.style.display = 'none';
        });
    }

    if (cameraModal) {
        cameraModal.addEventListener('click', function(e) {
            if (e.target === cameraModal) {
                cameraModal.style.display = 'none';
            }
        });
    }


    let currentIdForModal = '';
    function getCurrentId() {
        return currentIdForModal;
    }
    

    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => { video.srcObject = stream; })
    .catch(err => console.error("Webcam error:", err));

    captureBtn.addEventListener("click", () => {
        if (video.classList.value === 'error') {
            video.classList.remove('error');
        }

        const slotWidth = 174;  // width of portrait slot
        const slotHeight = 274; // height of portrait slot

        const videoAspect = video.videoWidth / video.videoHeight; // webcam
        const slotAspect = slotWidth / slotHeight;                // portrait slot

        let sx, sy, sw, sh;

        if (videoAspect > slotAspect) {
            // video wider → crop left/right
            sh = video.videoHeight;
            sw = sh * slotAspect;
            sx = (video.videoWidth - sw) / 2;
            sy = 0;
        } else {
            // video taller → crop top/bottom
            sw = video.videoWidth;
            sh = sw / slotAspect;
            sx = 0;
            sy = (video.videoHeight - sh) / 2;
        }

        // clear previous canvas
        ctx.clearRect(0, 0, videoCanvas.width, videoCanvas.height);

        // Draw cropped video into **portrait slot**, centered on canvas
        const dx = (videoCanvas.width - slotWidth) / 2;
        const dy = (videoCanvas.height - slotHeight) / 2;

        ctx.drawImage(video, sx, sy, sw, sh, dx, dy, slotWidth, slotHeight);

        const dataUrl = videoCanvas.toDataURL("image/png");
        preview.src = dataUrl;
        photoData.value = dataUrl;
    });


    // Setup webcam for edit modal
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => { videoEdit.srcObject = stream; })
    .catch(err => console.error("Webcam error:", err));

    captureBtnEdit.addEventListener("click", () => {
    const canvasWidth = videoCanvasEdit.width;
    const canvasHeight = videoCanvasEdit.height;

    const slotWidth = 174;    // width of portrait slot for edit
    const slotHeight = 274;   // height of portrait slot for edit
    const slotAspect = slotWidth / slotHeight;

    const videoAspect = videoEdit.videoWidth / videoEdit.videoHeight;
    let sx, sy, sw, sh;

    if (videoAspect > slotAspect) {
        // video wider → crop left/right
        sh = videoEdit.videoHeight;
        sw = sh * slotAspect;
        sx = (videoEdit.videoWidth - sw) / 2;
        sy = 0;
    } else {
        // video taller → crop top/bottom
        sw = videoEdit.videoWidth;
        sh = sw / slotAspect;
        sx = 0;
        sy = (videoEdit.videoHeight - sh) / 2;
    }

    ctxEdit.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw cropped video into portrait slot, centered on canvas
    const dx = (canvasWidth - slotWidth) / 2;
    const dy = (canvasHeight - slotHeight) / 2;

    ctxEdit.drawImage(videoEdit, sx, sy, sw, sh, dx, dy, slotWidth, slotHeight);

    const dataUrl = videoCanvasEdit.toDataURL("image/png");
    previewEdit.src = dataUrl;
    photoDataEdit.value = dataUrl; // store updated photo for editing
    
    // Update the current photo display with the newly captured image
    const currentPhotoImg = document.querySelector('#currentPhoto-edit');
    if (currentPhotoImg) {
        currentPhotoImg.src = dataUrl;
        currentPhotoImg.style.display = 'block';
    }
    });


    search.addEventListener('keyup', function() {
        const query = this.value;
        view(query);
    });

    

    contactNum.addEventListener("input", () => {
    contactNum.value = contactNum.value.replace(/\D/g, ""); 
    });

    e_contactNum.addEventListener("input", () => {
    e_contactNum.value = e_contactNum.value.replace(/\D/g, "");
    });

    
    cardNum.addEventListener("input", () => {
    cardNum.value = cardNum.value.replace(/\D/g, ""); 
    });
    
    contactNumEdit.addEventListener("input", () => {
    contactNumEdit.value = contactNumEdit.value.replace(/\D/g, "");
    });

    
    cardNumEdit.addEventListener("input", () => {
    cardNumEdit.value = cardNumEdit.value.replace(/\D/g, "");
    });

    e_contact_number.addEventListener("input", () => {
    e_contact_number.value = e_contact_number.value.replace(/\D/g, "");
    });

    document.getElementById('closeNewMember').onclick = function() {
    document.querySelector('.newMemberModal').style.display = 'none';
    };
    
    document.getElementById('closeEditMember').onclick = function() {
        document.querySelector('.editMemberModal').style.display = 'none';
    };

    window.addEventListener("click", (e) => {
        if (e.target === editMemberModal) {
        editMemberModal.style.display = "none";
        }
    });

    addBtn.addEventListener('click', function() {
        newMemberModal.style.display = "flex";
    });
    view();

    window.addEventListener("click", (e) => {
        if (e.target === newMemberModal) {
            newMemberModal.style.display = "none";
        }
    });

    // Handle add member cancel button click
    confirmCancel.addEventListener('click', function() {
        confirmModal.classList.add('hidden');
    });
    
    // Close add member modal when clicking outside
    confirmModal.addEventListener('click', function(e) {
        if (e.target === confirmModal) {
            confirmModal.classList.add('hidden');
        }
    });
    
    // Edit member form handling
    const confirmEditModal = document.getElementById('confirmEditModal');
    const confirmEditSubmit = document.getElementById('confirmEditSubmit');
    const confirmEditCancel = document.getElementById('confirmEditCancel');
    let editMemberForm = null;
    
    // Handle edit form submission button click
    document.getElementById('editSubmitBtn').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Store the form reference BEFORE showing the modal
        editMemberForm = document.getElementById('editMember');
        
        // Show edit confirmation modal
        confirmEditModal.classList.remove('hidden');
    });
    
    // Handle edit confirm button click
    confirmEditSubmit.addEventListener('click', function() {
        confirmEditModal.classList.add('hidden');
        const formData = new FormData();
        
        // Get the photo data from the hidden input
        const photoData = document.getElementById('photoData-edit').value;
        
        // Manually append form data from the stored form reference
        const inputs = editMemberForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            // Skip the hidden photo data input as we'll handle it separately
            if (input.id === 'photoData-edit') return;
            
            if (input.name && input.type !== 'file') {
                formData.append(input.name, input.value);
            } else if (input.type === 'file' && input.files.length > 0) {
                formData.append(input.name, input.files[0]);
            }
        });
        
        // Handle the photo data if it exists - send as raw base64 string, not as file
        if (photoData) {
            // Send the base64 data directly as a string, not as a file
            formData.append('photo', photoData);
        }
    
        // Add the member ID and submit the form
        formData.append('id', document.getElementById('memberId').value);
        
        fetch('scripts/update.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update the current photo display immediately with the new photo
                const currentPhotoImg = document.querySelector('#currentPhoto-edit');
                if (currentPhotoImg && photoData) {
                    currentPhotoImg.src = photoData;
                }
                
                // Also update the preview with the new photo
                const previewEdit = document.querySelector('#snapshotPreview-edit');
                if (previewEdit && photoData) {
                    previewEdit.src = photoData;
                }
                
                // Hide the modal and refresh the view (but not the whole page)
                editMemberModal.style.display = 'none';
                view(); // Refresh the member list instead of reloading the page
            } else {
                alert(data.message || 'Failed to update member');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating the member.');
        });
    });
    
    
    // Handle edit cancel button click
    confirmEditCancel.addEventListener('click', function() {
        confirmEditModal.classList.add('hidden');
    });
    
    // Close edit modal when clicking outside
    confirmEditModal.addEventListener('click', function(e) {
        if (e.target === confirmEditModal) {
            confirmEditModal.classList.add('hidden');
        }
    });
    
    window.addEventListener('keydown', function(e) {
        if (e.key === "Escape" || e.key === "Esc") {
            if (!confirmModal.classList.contains('hidden')) {
                confirmModal.classList.add('hidden');
            } else if (!confirmEditModal.classList.contains('hidden')) {
                confirmEditModal.classList.add('hidden');
            } else if (newMemberModal.style.display === "flex") {
                newMemberModal.style.display = "none";
            } else if (editMemberModal.style.display === "flex") {
                editMemberModal.style.display = "none";
            }
        }
    });

    
    // Add event listener for when search input is cleared
    search.addEventListener('search', function() {
        // This event fires when the X button is clicked or search is cleared
        const query = this.value;
        view(query);
    });

    // Also add input event to handle all input changes including clearing
    search.addEventListener('input', function() {
        const query = this.value;
        view(query);
    });
});
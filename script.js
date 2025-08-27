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
                row.innerHTML = `
                    <td>${member.id}</td>
                    <td>${member.card_no}</td>
                    <td>${member.fname} ${member.lname}</td>
                    <td>${member.contact_no}</td>
                    <td>${member.membership_date}</td>
                    <td>
                        <button class="editBtn action-btn"
                            data-id="${member.id}"
                            data-fname="${member.fname}"
                            data-lname="${member.lname}"
                        >Edit</button>
                        
                        <button class="downloadBtn action-btn"
                            data-id="${member.id}"
                            data-fname="${member.fname}"
                            data-lname="${member.lname}"
                            data-membership="${member.membership_date}"
                            data-contact="${member.contact_no}"
                            data-contactperson="${member.E_contact_person}"
                            data-cardNum="${member.card_no}"
                        >Download</button>

                        <button class="printBtn action-btn"
                            data-fname="${member.fname}"
                            data-lname="${member.lname}"
                            data-membership="${member.membership_date}"
                            data-contact="${member.contact_no}"
                            data-contactperson="${member.E_contact_person}"
                            data-id="${member.id}"
                            data-cardnum="${member.card_no}"
                        >Print</button>
                    </td>
                `;
                tableBody.appendChild(row);
               
            })

      


        pagination.innerHTML = '';
            if (page > 1) {
                const prev = document.createElement('button');
                prev.textContent = "Prev";
                prev.onclick = () => view(query, page - 1);
                pagination.appendChild(prev);
            }

            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.textContent = i;
                if (i === page) btn.disabled = true;
                btn.onclick = () => view(query, i);
                pagination.appendChild(btn);
            }

            if (page < totalPages) {
                const next = document.createElement('button');
                next.textContent = "Next";
                next.onclick = () => view(query, page + 1);
                pagination.appendChild(next);
            }
                document.querySelectorAll('.editBtn').forEach(btn => {
                btn.addEventListener('click', function(e){
                    const memberId = this.dataset.id;
                    const fname = this.dataset.fname;
                    const lname = this.dataset.lname;
                    document.querySelector('#memberName').innerHTML = `${fname} ${lname}`
                    
                    editMemberModal.style.display = "flex";
                    document.querySelector('#memberId').value = memberId
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

            generateID(id, card_no, fname + " " + lname, membership, contactPerson, contact);
        }

        else if (e.target.classList.contains("printBtn")) {
            const fname = e.target.dataset.fname;
            const lname = e.target.dataset.lname;
            const membership = e.target.dataset.membership;
            const contact = e.target.dataset.contact;
            const contactPerson = e.target.dataset.contactperson;
            const id = e.target.dataset.id;
            const card_no = e.target.dataset.cardnum;

        // call generateID for print only
        generateID(id, card_no, fname + " " + lname, membership, contactPerson, contact, "print"); 
        }
    });


    newMember.addEventListener('submit', function(e) {
        if (!photoData.value){
            alert("Please capture a photo first")
            return;
        }
        e.preventDefault();
        const form = new FormData(this);
        fetch('scripts/create.php', {
            method: 'POST',
            body: form
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            view();
            newMemberModal.style.display = "none";
            newMember.reset();
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
            alert(data.message);
            view(); 
            editMemberModal.style.display = "none";
            editMember.reset();
        }).catch(err => console.error(err));
    });



     function generateID(id, card_no, name, membership, contactPerson, contactNo, action = "download") {
        const canvas = document.getElementById("idCanvas");
        const ctx = canvas.getContext("2d");

        const template = new Image();
        template.src = "images/armani.png";

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

            photo.onload = function() {
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

                qr.onload = function() {
                    ctx.drawImage(qr, 474.5, 249.5, 99, 105);
                

                ctx.fillStyle = "#000";
                ctx.textBaseline = "top";

                fitText(ctx, name, 355, 123.5, 200, "Montserrat", 16.5);
                fitText(ctx, membership, 355, 144, 200, "Montserrat", 16.5);
                fitText(ctx, contactPerson, 290, 189, 200, "Montserrat", 10);
                fitText(ctx, contactNo, 290, 204, 200, "Montserrat", 10);

                const dataUrl = canvas.toDataURL("image/png");

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
                            width: 85.6mm;
                            height: 54mm;
                        }
                        img {
                            width: 85.6mm;
                            height: 54mm;
                            display: block;
                        }
                    `;
                    doc.head.appendChild(style);

                    const img = doc.createElement("img");
                    img.src = dataUrl;
                    img.onload = () => {
                        printWindow.focus();
                        printWindow.print();
                        printWindow.onafterprint = () => printWindow.close();
                    };
                    doc.body.appendChild(img);
                    } else {
                        const link = document.createElement("a");
                        link.download = id.replace(/\s+/g, "_") + "_ID.png";
                        link.href = dataUrl;
                        link.click();
                        }
                
                };
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
    

    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => { video.srcObject = stream; })
    .catch(err => console.error("Webcam error:", err));

    captureBtn.addEventListener("click", () => {
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

    window.addEventListener('keydown', function(e) {
        if (e.key === "Escape" || e.key === "Esc") {
            if (newMemberModal.style.display === "flex") {
                newMemberModal.style.display = "none";
            }
            if (editMemberModal.style.display === "flex") {
                editMemberModal.style.display = "none";
            }
        }
    });
})
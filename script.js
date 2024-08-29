document.addEventListener('DOMContentLoaded', function () {
    const toolSelector = document.getElementById('toolSelector');
    const dynamicContent = document.getElementById('dynamicContent');

    // Load the Dash Panel form by default
    loadDashPanelForm();

    toolSelector.addEventListener('change', function () {
        if (this.value === 'dashPanel') {
            loadDashPanelForm();
        } else if (this.value === 'switchPanel') {
            loadSwitchPanelForm();
        }
    });

    function loadDashPanelForm() {
        const formContent = `
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="material">Material Options</label>
                    <select id="material" class="form-control">
                        <option value="Carbon fibre">Carbon fibre ($800)</option>
                        <option value="10mm Dura-matte">10mm Dura-matte ($620)</option>
                        <option value="6mm Dura-matte">6mm Dura-matte ($400)</option>
                        <option value="10mm Acrylic">10mm Acrylic ($510)</option>
                        <option value="6mm Acrylic">6mm Acrylic ($320)</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="width">Panel Width (mm)</label>
                    <input type="number" id="width" class="form-control" placeholder="Enter width">
                </div>
                <div class="form-group col-md-6">
                    <label for="height">Panel Height (mm)</label>
                    <input type="number" id="height" class="form-control" placeholder="Enter height">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="panelShape">Panel Shape</label>
                    <select id="panelShape" class="form-control">
                        <option value="regular">Regular Shape</option>
                        <option value="digitization">Required Digitization ($240/hour)</option>
                    </select>
                </div>
            </div>
            <div id="digitizationHours" class="form-row" style="display: none;">
                <div class="form-group col-md-12">
                    <label for="digitizationHoursInput">Digitization Hours</label>
                    <input type="number" id="digitizationHoursInput" class="form-control" placeholder="Enter hours">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="designTime">Estimated Design Time (hours) ($120/hour)</label>
                    <input type="number" id="designTime" class="form-control" placeholder="Enter hours">
                </div>
                <div class="form-group col-md-6">
                    <label for="fabricationTime">Estimated Fabrication Time (hours) ($100/hour)</label>
                    <input type="number" id="fabricationTime" class="form-control" placeholder="Enter hours">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="numSwitches">Number of Switches ($40 each)</label>
                    <input type="number" id="numSwitches" class="form-control" placeholder="Enter number of switches">
                </div>
                <div class="form-group col-md-6">
                    <label for="edgeFinishing">Edge Finishing</label>
                    <select id="edgeFinishing" class="form-control">
                        <option value="straight">Straight ($0)</option>
                        <option value="bevelled & hand polished">Bevelled & hand polished ($120)</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="backlighting">Panel Backlighting</label>
                    <select id="backlighting" class="form-control">
                        <option value="none">None ($0)</option>
                        <option value="single">Single strip ($120)</option>
                        <option value="double">Double strip ($160)</option>
                        <option value="multiple">Multiple ($190)</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Optional Accessories</label>
                <div class="form-row">
                    <div class="col-md-6">
                        <label for="dimmerSwitchQty">Dimmer Switch ($70 each)</label>
                        <input type="number" id="dimmerSwitchQty" class="form-control" min="0" value="0">
                    </div>
                    <div class="col-md-6">
                        <label for="usbChargerQty">USB Charger ($35 each)</label>
                        <input type="number" id="usbChargerQty" class="form-control" min="0" value="0">
                    </div>
                </div>
                <div class="form-row mt-3">
                    <div class="col-md-6">
                        <label for="voltmeterQty">OLED Voltmeter ($75 each)</label>
                        <input type="number" id="voltmeterQty" class="form-control" min="0" value="0">
                    </div>
                    <div class="col-md-6">
                        <label for="outlet12VQty">12V Outlet ($22 each)</label>
                        <input type="number" id="outlet12VQty" class="form-control" min="0" value="0">
                    </div>
                </div>
                <div class="form-row mt-3">
                    <div class="col-md-6">
                        <label for="connectorType">Switch Connectors</label>
                        <select id="connectorType" class="form-control">
                            <option value="50cm">50cm connector ($9)</option>
                            <option value="120cm">120cm connector ($12)</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="connectorQty">Connector Quantity</label>
                        <input type="number" id="connectorQty" class="form-control" min="0" value="0">
                    </div>
                </div>
            </div>
        `;

        dynamicContent.innerHTML = formContent;

        document.getElementById('panelShape').addEventListener('change', function () {
            const digitizationSection = document.getElementById('digitizationHours');
            digitizationSection.style.display = this.value === 'digitization' ? 'block' : 'none';
        });

        document.getElementById('calculateBtn').addEventListener('click', function () {
            const materialName = document.getElementById('material').value;
            const width = parseFloat(document.getElementById('width').value) || 0;
            const height = parseFloat(document.getElementById('height').value) || 0;

            const materials = {
                'Carbon fibre': 800,
                '10mm Dura-matte': 620,
                '6mm Dura-matte': 400,
                '10mm Acrylic': 510,
                '6mm Acrylic': 320
            };

            const pricePerSheet = materials[materialName.split(' (')[0]] || 0;
            const fullSheetArea = 1200 * 600;
            const panelArea = width * height;
            const materialCost = (pricePerSheet / fullSheetArea) * panelArea;

            if (isNaN(materialCost) || materialCost <= 0) {
                document.getElementById('result').textContent = `Please enter valid dimensions for the panel size.`;
                return;
            }

            const panelShape = document.getElementById('panelShape').value;
            let digitizationCost = 0;
            if (panelShape === 'digitization') {
                const digitizationHours = parseFloat(document.getElementById('digitizationHoursInput').value) || 0;
                digitizationCost = digitizationHours * 240;
            }

            const designTime = parseFloat(document.getElementById('designTime').value) || 0;
            const designCost = designTime * 120;

            const fabricationTime = parseFloat(document.getElementById('fabricationTime').value) || 0;
            const fabricationCost = fabricationTime * 100;

            const numSwitches = parseFloat(document.getElementById('numSwitches').value) || 0;
            const switchCost = numSwitches * 40;

            let edgeFinishingCost = 0;
            const edgeFinishing = document.getElementById('edgeFinishing').value;
            if (edgeFinishing === 'bevelled & hand polished') {
                edgeFinishingCost = 120;
            }

            let backlightingCost = 0;
            const backlighting = document.getElementById('backlighting').value;
            if (backlighting === 'single') {
                backlightingCost = 120;
            } else if (backlighting === 'double') {
                backlightingCost = 160;
            } else if (backlighting === 'multiple') {
                backlightingCost = 190;
            }

            const dimmerSwitchQty = parseFloat(document.getElementById('dimmerSwitchQty').value) || 0;
            const usbChargerQty = parseFloat(document.getElementById('usbChargerQty').value) || 0;
            const voltmeterQty = parseFloat(document.getElementById('voltmeterQty').value) || 0;
            const outlet12VQty = parseFloat(document.getElementById('outlet12VQty').value) || 0;

            const connectorType = document.getElementById('connectorType').value;
            const connectorQty = parseFloat(document.getElementById('connectorQty').value) || 0;
            const connectorCost = connectorType === '50cm' ? connectorQty * 9 : connectorQty * 12;

            const accessoriesCost = (dimmerSwitchQty * 70) + (usbChargerQty * 35) + (voltmeterQty * 75) + 
                                    (outlet12VQty * 22) + connectorCost;

            const totalCost = materialCost + digitizationCost + designCost + fabricationCost + 
                              switchCost + edgeFinishingCost + backlightingCost + accessoriesCost;
            const wholesaleCost = totalCost * 0.8; // 20% discount

            document.getElementById('result').innerHTML = `
                Retail Price: $${totalCost.toFixed(2)}<br>
                Wholesale Price (20% off): $${wholesaleCost.toFixed(2)}
            `;
        });
    }

    function loadSwitchPanelForm() {
        const formContent = `
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="panelShape">Panel Shape</label>
                    <select id="panelShape" class="form-control">
                        <option value="regular">Regular Shape</option>
                        <option value="digitization">Required Digitization ($240/hour)</option>
                    </select>
                </div>
            </div>
            <div id="digitizationHours" class="form-row" style="display: none;">
                <div class="form-group col-md-12">
                    <label for="digitizationHoursInput">Digitization Hours</label>
                    <input type="number" id="digitizationHoursInput" class="form-control" placeholder="Enter hours">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="designTime">Estimated Design Time (hours) ($120/hour)</label>
                    <input type="number" id="designTime" class="form-control" placeholder="Enter hours">
                </div>
                <div class="form-group col-md-6">
                    <label for="fabricationTime">Estimated Fabrication Time (hours) ($100/hour)</label>
                    <input type="number" id="fabricationTime" class="form-control" placeholder="Enter hours">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="numSwitches">Number of Switches ($40 each)</label>
                    <input type="number" id="numSwitches" class="form-control" placeholder="Enter number of switches">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="backlighting">Panel Backlighting</label>
                    <select id="backlighting" class="form-control">
                        <option value="none">None ($0)</option>
                        <option value="single">Single strip ($120)</option>
                        <option value="double">Double strip ($160)</option>
                        <option value="multiple">Multiple ($190)</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Optional Accessories</label>
                <div class="form-row">
                    <div class="col-md-6">
                        <label for="dimmerSwitchQty">Dimmer Switch ($70 each)</label>
                        <input type="number" id="dimmerSwitchQty" class="form-control" min="0" value="0">
                    </div>
                    <div class="col-md-6">
                        <label for="usbChargerQty">USB Charger ($35 each)</label>
                        <input type="number" id="usbChargerQty" class="form-control" min="0" value="0">
                    </div>
                </div>
                <div class="form-row mt-3">
                    <div class="col-md-6">
                        <label for="voltmeterQty">OLED Voltmeter ($75 each)</label>
                        <input type="number" id="voltmeterQty" class="form-control" min="0" value="0">
                    </div>
                    <div class="col-md-6">
                        <label for="outlet12VQty">12V Outlet ($22 each)</label>
                        <input type="number" id="outlet12VQty" class="form-control" min="0" value="0">
                    </div>
                </div>
                <div class="form-row mt-3">
                    <div class="col-md-6">
                        <label for="connectorType">Switch Connectors</label>
                        <select id="connectorType" class="form-control">
                            <option value="50cm">50cm connector ($9)</option>
                            <option value="120cm">120cm connector ($12)</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="connectorQty">Connector Quantity</label>
                        <input type="number" id="connectorQty" class="form-control" min="0" value="0">
                    </div>
                </div>
            </div>
        `;

        dynamicContent.innerHTML = formContent;

        document.getElementById('panelShape').addEventListener('change', function () {
            const digitizationSection = document.getElementById('digitizationHours');
            digitizationSection.style.display = this.value === 'digitization' ? 'block' : 'none';
        });

        document.getElementById('calculateBtn').addEventListener('click', function () {
            const panelShape = document.getElementById('panelShape').value;
            let digitizationCost = 0;
            if (panelShape === 'digitization') {
                const digitizationHours = parseFloat(document.getElementById('digitizationHoursInput').value) || 0;
                digitizationCost = digitizationHours * 240; // $240 per hour
            }

            const designTime = parseFloat(document.getElementById('designTime').value) || 0;
            const designCost = designTime * 120; // $120 per hour for design time

            const fabricationTime = parseFloat(document.getElementById('fabricationTime').value) || 0;
            const fabricationCost = fabricationTime * 100; // $100 per hour for fabrication time

            const numSwitches = parseFloat(document.getElementById('numSwitches').value) || 0;
            const switchCost = numSwitches * 40; // $40 per switch

            let backlightingCost = 0;
            const backlighting = document.getElementById('backlighting').value;
            if (backlighting === 'single') {
                backlightingCost = 120; // $120 for single strip
            } else if (backlighting === 'double') {
                backlightingCost = 160; // $160 for double strip
            } else if (backlighting === 'multiple') {
                backlightingCost = 190; // $190 for multiple strips
            } else {
                backlightingCost = 0; // $0 for no backlighting
            }

            const dimmerSwitchQty = parseFloat(document.getElementById('dimmerSwitchQty').value) || 0;
            const usbChargerQty = parseFloat(document.getElementById('usbChargerQty').value) || 0;
            const voltmeterQty = parseFloat(document.getElementById('voltmeterQty').value) || 0;
            const outlet12VQty = parseFloat(document.getElementById('outlet12VQty').value) || 0;

            const connectorType = document.getElementById('connectorType').value;
            const connectorQty = parseFloat(document.getElementById('connectorQty').value) || 0;
            const connectorCost = connectorType === '50cm' ? connectorQty * 9 : connectorQty * 12; // $9 for 50cm, $12 for 120cm

            const accessoriesCost = (dimmerSwitchQty * 70) + // $70 per dimmer switch
                                    (usbChargerQty * 35) + // $35 per USB charger
                                    (voltmeterQty * 75) +  // $75 per OLED voltmeter
                                    (outlet12VQty * 22) +  // $22 per 12V outlet
                                    connectorCost;           // Cost of switch connectors

            const totalCost = digitizationCost + designCost + fabricationCost + switchCost + backlightingCost + accessoriesCost;
            const wholesaleCost = totalCost * 0.8; // 20% discount

            document.getElementById('result').innerHTML = `
                Retail Price: $${totalCost.toFixed(2)}<br>
                Wholesale Price (20% off): $${wholesaleCost.toFixed(2)}
            `;
        });
    }
});

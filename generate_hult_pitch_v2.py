from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE
import os

def generate_hult_prize_pptx():
    prs = Presentation()
    
    # Configurar formato 16:9 
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    
    blank_slide_layout = prs.slide_layouts[6]
    
    def set_dark_bg(slide):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = RGBColor(5, 5, 5) # #050505
        
    def add_bg_image(slide, image_path):
        if os.path.exists(image_path):
            pic = slide.shapes.add_picture(image_path, 0, 0, width=prs.slide_width, height=prs.slide_height)
            slide.shapes._spTree.remove(pic._element)
            slide.shapes._spTree.insert(2, pic._element)

    def add_title(slide, text, top=0.5, font_size=40, color=(255,255,255), align=PP_ALIGN.CENTER):
        txBox = slide.shapes.add_textbox(Inches(1), Inches(top), Inches(11.333), Inches(1.5))
        tf = txBox.text_frame
        p = tf.paragraphs[0]
        p.text = text
        p.font.size = Pt(font_size)
        p.font.bold = True
        p.font.color.rgb = RGBColor(*color)
        p.alignment = align
        return tf

    # ==========================
    # SLIDE 1: PORTADA
    # ==========================
    slide1 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide1)
    add_bg_image(slide1, "ultra_visible_brain_bg.jpg")
    
    txTop = slide1.shapes.add_textbox(Inches(2.5), Inches(1.5), Inches(8.333), Inches(0.5))
    tfTop = txTop.text_frame
    pTop = tfTop.paragraphs[0]
    pTop.text = "HULT PRIZE 2026 INTERNATIONAL PITCH"
    pTop.alignment = PP_ALIGN.CENTER
    pTop.font.size = Pt(16)
    pTop.font.bold = True
    pTop.font.color.rgb = RGBColor(56, 189, 248) # Cyan-400
    
    txTitle = slide1.shapes.add_textbox(Inches(1), Inches(2.2), Inches(11.333), Inches(2.5))
    tfTitle = txTitle.text_frame
    tfTitle.word_wrap = True
    pTitle = tfTitle.paragraphs[0]
    pTitle.text = "Solving the Unseen.\nScaling the Impact."
    pTitle.alignment = PP_ALIGN.CENTER
    pTitle.font.size = Pt(65)
    pTitle.font.bold = True
    pTitle.font.color.rgb = RGBColor(255, 255, 255)
    
    txSub = slide1.shapes.add_textbox(Inches(1.5), Inches(5), Inches(10.333), Inches(1.5))
    tfSub = txSub.text_frame
    tfSub.word_wrap = True
    pSub = tfSub.paragraphs[0]
    pSub.text = "Pioneering Dual AI Architecture for Global Healthcare (Alzheimer's) and Food Security (Banana Plagues) powered by DeepMind & USC LONI."
    pSub.alignment = PP_ALIGN.CENTER
    pSub.font.size = Pt(22)
    pSub.font.bold = True
    pSub.font.color.rgb = RGBColor(230, 230, 230)

    # ==========================
    # SLIDE 2: PROBLEM
    # ==========================
    slide2 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide2)
    add_bg_image(slide2, "ultra_visible_brain_bg.jpg")
    add_title(slide2, "Two Planetary Crises.\nOne Root Cause: Late Detection.", top=0.8, font_size=45, color=(255,255,255), align=PP_ALIGN.LEFT)
    
    tx_alz = slide2.shapes.add_textbox(Inches(1), Inches(3), Inches(5.2), Inches(3.5))
    tf_alz = tx_alz.text_frame
    tf_alz.word_wrap = True
    pA1 = tf_alz.paragraphs[0]
    pA1.text = "1. Healthcare: Neurological Collapse"
    pA1.font.size = Pt(26)
    pA1.font.bold = True
    pA1.font.color.rgb = RGBColor(255, 255, 255)
    
    pA2 = tf_alz.add_paragraph()
    pA2.text = "\n• $1.3T Global economic cost of dementia. Structural brain damage is irreversible by the time symptoms appear."
    pA2.font.size = Pt(18)
    pA2.font.bold = True
    pA2.font.color.rgb = RGBColor(230, 230, 230)
    
    pA3 = tf_alz.add_paragraph()
    pA3.text = "\n• 20% Misdiagnosis rate in standard health systems due to fragmented human analysis of MRIs."
    pA3.font.size = Pt(18)
    pA3.font.bold = True
    pA3.font.color.rgb = RGBColor(230, 230, 230)

    tx_agr = slide2.shapes.add_textbox(Inches(7), Inches(3), Inches(5.2), Inches(3.5))
    tf_agr = tx_agr.text_frame
    tf_agr.word_wrap = True
    pAg1 = tf_agr.paragraphs[0]
    pAg1.text = "2. Food Security: Agricultural Collapse"
    pAg1.font.size = Pt(26)
    pAg1.font.bold = True
    pAg1.font.color.rgb = RGBColor(255, 255, 255)
    
    pAg2 = tf_agr.add_paragraph()
    pAg2.text = "\n• 400M+ People rely on bananas as their staple food. TR4 Fusarium Wilt destroys entire plantations."
    pAg2.font.size = Pt(18)
    pAg2.font.bold = True
    pAg2.font.color.rgb = RGBColor(230, 230, 230)
    
    pAg3 = tf_agr.add_paragraph()
    pAg3.text = "\n• 100% Crop loss occurs because farmers lack access to laboratory-grade phytopathology tools in the field."
    pAg3.font.size = Pt(18)
    pAg3.font.bold = True
    pAg3.font.color.rgb = RGBColor(230, 230, 230)

    # ==========================
    # SLIDE 3: UNIFYING ARCHITECTURE (CLEAN BACKGROUND AS REQUESTED)
    # ==========================
    slide3 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide3)
    add_title(slide3, "The Unified AI Brain", top=0.5, font_size=18, color=(168, 85, 247), align=PP_ALIGN.CENTER)
    add_title(slide3, "Perdix Origin Platform", top=1.0, font_size=55, align=PP_ALIGN.CENTER)
    
    txCent = slide3.shapes.add_textbox(Inches(2), Inches(2.5), Inches(9.333), Inches(1.5))
    tfCent = txCent.text_frame
    tfCent.word_wrap = True
    pCent = tfCent.paragraphs[0]
    pCent.text = "Different problems, identical underlying mathematical challenge: Pattern Recognition at early stages. Our platform orchestrates two specialized engines."
    pCent.font.size = Pt(20)
    pCent.font.color.rgb = RGBColor(200, 200, 200)
    pCent.alignment = PP_ALIGN.CENTER
    
    tx_cloud = slide3.shapes.add_textbox(Inches(1.5), Inches(4.5), Inches(4), Inches(2))
    tf_cloud = tx_cloud.text_frame
    tf_cloud.word_wrap = True
    pc1 = tf_cloud.paragraphs[0]
    pc1.text = "🧠 Cloud AI"
    pc1.font.bold = True
    pc1.font.size = Pt(28)
    pc1.alignment = PP_ALIGN.CENTER
    pc1.font.color.rgb = RGBColor(255,255,255)
    pc2 = tf_cloud.add_paragraph()
    pc2.text = "Deep Tensor Extraction & Healthcare Multi-modal Fusion"
    pc2.font.size = Pt(16)
    pc2.font.bold = True
    pc2.font.color.rgb = RGBColor(200,200,200)
    pc2.alignment = PP_ALIGN.CENTER
    
    tx_mid = slide3.shapes.add_textbox(Inches(5.5), Inches(4.5), Inches(2.333), Inches(1))
    tf_mid = tx_mid.text_frame
    pmid = tf_mid.paragraphs[0]
    pmid.text = "<===>"
    pmid.font.size = Pt(40)
    pmid.font.color.rgb = RGBColor(168, 85, 247)
    pmid.alignment = PP_ALIGN.CENTER
    
    tx_edge = slide3.shapes.add_textbox(Inches(7.8), Inches(4.5), Inches(4), Inches(2))
    tf_edge = tx_edge.text_frame
    tf_edge.word_wrap = True
    pe1 = tf_edge.paragraphs[0]
    pe1.text = "📱 Edge AI"
    pe1.font.bold = True
    pe1.font.size = Pt(28)
    pe1.alignment = PP_ALIGN.CENTER
    pe1.font.color.rgb = RGBColor(255,255,255)
    pe2 = tf_edge.add_paragraph()
    pe2.text = "Agrotech Computer Vision engineered for Mobile Offline Inferencing"
    pe2.font.size = Pt(16)
    pe2.font.bold = True
    pe2.font.color.rgb = RGBColor(200,200,200)
    pe2.alignment = PP_ALIGN.CENTER

    # ==========================
    # SLIDE 4: THE DATA FOUNDATION
    # ==========================
    slide4 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide4)
    add_bg_image(slide4, "ultra_visible_brain_bg.jpg")
    
    add_title(slide4, "Global Data Foundation", top=0.5, font_size=18, color=(59, 130, 246), align=PP_ALIGN.LEFT)
    add_title(slide4, "USC LONI & The IDEAS Project", top=1.0, font_size=45, align=PP_ALIGN.LEFT)
    
    tx4L = slide4.shapes.add_textbox(Inches(1), Inches(2), Inches(6.5), Inches(4.5))
    tf4L = tx4L.text_frame
    tf4L.word_wrap = True
    
    p4_1 = tf4L.paragraphs[0]
    p4_1.text = "Our AI models aren't trained on synthetic or standard data. We leverage the Image Data Archive (IDA) from the Laboratory of Neuro Imaging (LONI) at the University of Southern California (USC).\n"
    p4_1.font.size = Pt(18)
    p4_1.font.color.rgb = RGBColor(250, 250, 250)
    
    p4_2 = tf4L.add_paragraph()
    p4_2.text = "■ The IDEAS Study Validation"
    p4_2.font.bold = True
    p4_2.font.size = Pt(20)
    p4_2.font.color.rgb = RGBColor(255,255,255)
    
    p4_3 = tf4L.add_paragraph()
    p4_3.text = "We base our architecture on findings correlated with the IDEAS (Imaging Dementia—Evidence for Amyloid Scanning) project, enhancing PET scan analytical correlations with NIfTI MRI.\n"
    p4_3.font.size = Pt(16)
    p4_3.font.bold = True
    p4_3.font.color.rgb = RGBColor(230, 230, 230)
    
    p4_4 = tf4L.add_paragraph()
    p4_4.text = "■ ADNI Standardization"
    p4_4.font.bold = True
    p4_4.font.size = Pt(20)
    p4_4.font.color.rgb = RGBColor(255,255,255)
    
    p4_5 = tf4L.add_paragraph()
    p4_5.text = "Strict adherence to Alzheimer's Disease Neuroimaging Initiative standardizations, parsing thousands of multi-country subjects ensuring zero bias clinical reliability."
    p4_5.font.size = Pt(16)
    p4_5.font.bold = True
    p4_5.font.color.rgb = RGBColor(230, 230, 230)
    
    tx4R = slide4.shapes.add_textbox(Inches(8), Inches(4), Inches(4), Inches(2))
    tf4R = tx4R.text_frame
    p4r = tf4R.paragraphs[0]
    p4r.text = "145,000+"
    p4r.font.bold = True
    p4r.font.size = Pt(55)
    p4r.font.color.rgb = RGBColor(255,255,255)
    p4r.alignment = PP_ALIGN.CENTER
    p4r2 = tf4R.add_paragraph()
    p4r2.text = "SIGNATURES ANALYZED BY IDA GLOBALLY"
    p4r2.font.size = Pt(16)
    p4r2.font.bold = True
    p4r2.font.color.rgb = RGBColor(200, 200, 200)
    p4r2.alignment = PP_ALIGN.CENTER

    # ==========================
    # SLIDE 5: HEALTHCARE SOLUTION
    # ==========================
    slide5 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide5)
    add_bg_image(slide5, "ultra_visible_brain_bg.jpg")
    
    add_title(slide5, "Technological Moat 1", top=0.5, font_size=18, color=(56, 189, 248), align=PP_ALIGN.LEFT)
    add_title(slide5, "Healthcare: MedGemma & Late-Fusion", top=1.0, font_size=40, align=PP_ALIGN.LEFT)
    
    txS3L = slide5.shapes.add_textbox(Inches(1), Inches(2), Inches(4.5), Inches(4.5))
    tfS3L = txS3L.text_frame
    tfS3L.word_wrap = True
    
    pS1 = tfS3L.paragraphs[0]
    pS1.text = "Google DeepMind Integration"
    pS1.font.bold = True
    pS1.font.size = Pt(14)
    pS1.font.color.rgb = RGBColor(56, 189, 248)
    pS1_title = tfS3L.add_paragraph()
    pS1_title.text = "MedGemma-4B-IT Ecosystem"
    pS1_title.font.bold = True
    pS1_title.font.size = Pt(22)
    pS1_title.font.color.rgb = RGBColor(255,255,255)
    pS1_1 = tfS3L.add_paragraph()
    pS1_1.text = "We process dense clinical data and EHR using Google's pioneering medical LLM, bridging the gap between raw data and digestible medical insights.\n"
    pS1_1.font.size = Pt(16)
    pS1_1.font.bold = True
    pS1_1.font.color.rgb = RGBColor(220,220,220)
    
    pS2 = tfS3L.add_paragraph()
    pS2.text = "Proprietary Architecture"
    pS2.font.bold = True
    pS2.font.size = Pt(14)
    pS2.font.color.rgb = RGBColor(168, 85, 247)
    pS2_title = tfS3L.add_paragraph()
    pS2_title.text = "Late-Fusion Multivariate AI"
    pS2_title.font.bold = True
    pS2_title.font.size = Pt(22)
    pS2_title.font.color.rgb = RGBColor(255,255,255)
    pS2_1 = tfS3L.add_paragraph()
    pS2_1.text = "Our clinical AI organically fuses 128 deep Keras parameters perfectly intertwined with Patient Age, MMSE, and clinical history through an XGBoost logic tree."
    pS2_1.font.size = Pt(16)
    pS2_1.font.bold = True
    pS2_1.font.color.rgb = RGBColor(220,220,220)
    
    try:
        if os.path.exists("cm_real.png"):
            slide5.shapes.add_picture("cm_real.png", Inches(5.8), Inches(2.2), width=Inches(3.5))
        if os.path.exists("roc_real.png"):
            slide5.shapes.add_picture("roc_real.png", Inches(9.5), Inches(2.2), width=Inches(3.5))
    except Exception as e:
        pass


    # ==========================
    # SLIDE 6: SOLUCION BANANA
    # ==========================
    slide6 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide6)
    add_bg_image(slide6, "ultra_visible_banana_bg.jpg")
    
    add_title(slide6, "Technological Moat 2", top=0.8, font_size=18, color=(74, 222, 128), align=PP_ALIGN.CENTER)
    add_title(slide6, "Banana Disease Edge AI", top=1.3, font_size=55, align=PP_ALIGN.CENTER)
    
    txStats = slide6.shapes.add_textbox(Inches(1), Inches(3.0), Inches(11.333), Inches(1.5))
    tfStats = txStats.text_frame
    tfStats.word_wrap = True
    pStats = tfStats.paragraphs[0]
    pStats.text = "99% TARGET ACCURACY      |      EDGE OFFLINE EXECUTION      |      < 1s INFERENCE TIME"
    pStats.alignment = PP_ALIGN.CENTER
    pStats.font.bold = True
    pStats.font.size = Pt(24)
    pStats.font.color.rgb = RGBColor(74, 222, 128)
    
    txAGesc = slide6.shapes.add_textbox(Inches(2), Inches(4.5), Inches(9.333), Inches(1.5))
    tfAGesc = txAGesc.text_frame
    tfAGesc.word_wrap = True
    pag = tfAGesc.paragraphs[0]
    pag.text = "Built specifically for remote LATAM/African rural regions without internet. We utilize heavily quantized Convolutional Neural Networks on mobile devices to detect microscopic symptomatic patterns on banana leaves, halting TR4 outbreaks instantly."
    pag.alignment = PP_ALIGN.CENTER
    pag.font.bold = True
    pag.font.size = Pt(23)
    pag.font.color.rgb = RGBColor(240, 240, 240)

    # ==========================
    # SLIDE 7: MARKET OPPORTUNITY (BRAIN / AGRO FUSION)
    # ==========================
    slide7 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide7)
    add_bg_image(slide7, "ultra_visible_brain_bg.jpg")
    add_title(slide7, "Global Scale", top=0.5, font_size=18, color=(250, 204, 21), align=PP_ALIGN.CENTER)
    add_title(slide7, "The Market Opportunity", top=1.0, font_size=55, align=PP_ALIGN.CENTER)
    
    # TAM
    tTam = slide7.shapes.add_textbox(Inches(1), Inches(3.5), Inches(3.5), Inches(2))
    tfTam = tTam.text_frame
    pTam = tfTam.paragraphs[0]
    pTam.text = "$180B+"
    pTam.font.size = Pt(55)
    pTam.font.bold = True
    pTam.font.color.rgb = RGBColor(255,255,255)
    pTam.alignment = PP_ALIGN.CENTER
    pTam2 = tfTam.add_paragraph()
    pTam2.text = "TAM\nCombined AI Health & Agro Market"
    pTam2.font.size = Pt(18)
    pTam2.font.bold = True
    pTam2.font.color.rgb = RGBColor(220,220,220)
    pTam2.alignment = PP_ALIGN.CENTER
    
    # SAM
    tSam = slide7.shapes.add_textbox(Inches(4.9), Inches(3.5), Inches(3.5), Inches(2))
    tfSam = tSam.text_frame
    pSam = tfSam.paragraphs[0]
    pSam.text = "$15B"
    pSam.font.size = Pt(55)
    pSam.font.bold = True
    pSam.font.color.rgb = RGBColor(202, 138, 4)
    pSam.alignment = PP_ALIGN.CENTER
    pSam2 = tfSam.add_paragraph()
    pSam2.text = "SAM\nLATAM & Developing Nations Needs"
    pSam2.font.size = Pt(18)
    pSam2.font.bold = True
    pSam2.font.color.rgb = RGBColor(220,220,220)
    pSam2.alignment = PP_ALIGN.CENTER
    
    # SOM
    tSom = slide7.shapes.add_textbox(Inches(8.8), Inches(3.5), Inches(3.5), Inches(2))
    tfSom = tSom.text_frame
    pSom = tfSom.paragraphs[0]
    pSom.text = "$150M"
    pSom.font.size = Pt(55)
    pSom.font.bold = True
    pSom.font.color.rgb = RGBColor(250, 204, 21)
    pSom.alignment = PP_ALIGN.CENTER
    pSom2 = tfSom.add_paragraph()
    pSom2.text = "SOM (Year 3)\nPenetration in Key Farming & Clinic Hubs"
    pSom2.font.size = Pt(18)
    pSom2.font.bold = True
    pSom2.font.color.rgb = RGBColor(220,220,220)
    pSom2.alignment = PP_ALIGN.CENTER


    # ==========================
    # SLIDE 8: BUSINESS VIABILITY (BRAIN)
    # ==========================
    slide8 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide8)
    add_bg_image(slide8, "ultra_visible_brain_bg.jpg")
    add_title(slide8, "Financial Sustainability", top=0.5, font_size=18, color=(74, 222, 128), align=PP_ALIGN.LEFT)
    add_title(slide8, "B2B & B2G Revenue Models", top=1.0, font_size=45, align=PP_ALIGN.LEFT)

    tx_biz1 = slide8.shapes.add_textbox(Inches(1), Inches(2.5), Inches(5.2), Inches(4))
    tf_biz1 = tx_biz1.text_frame
    tf_biz1.word_wrap = True
    pbiz1 = tf_biz1.paragraphs[0]
    pbiz1.text = "🏥 Healthcare SaaS\nB2B Licensing / Pay-per-Inference"
    pbiz1.font.size = Pt(28)
    pbiz1.font.bold = True
    pbiz1.font.color.rgb = RGBColor(255, 255, 255)
    
    pbiz1_2 = tf_biz1.add_paragraph()
    pbiz1_2.text = "\nClinics pay a monthly license or API-call fee to access our ADNI-Standard orchestrator, circumventing the need for million-dollar proprietary software setups locally."
    pbiz1_2.font.size = Pt(18)
    pbiz1_2.font.bold = True
    pbiz1_2.font.color.rgb = RGBColor(210, 210, 210)

    tx_biz2 = slide8.shapes.add_textbox(Inches(7), Inches(2.5), Inches(5.2), Inches(4))
    tf_biz2 = tx_biz2.text_frame
    tf_biz2.word_wrap = True
    pbiz2 = tf_biz2.paragraphs[0]
    pbiz2.text = "🌾 Agriculture Tech\nB2G & Conglomerate Contracts"
    pbiz2.font.size = Pt(28)
    pbiz2.font.bold = True
    pbiz2.font.color.rgb = RGBColor(255, 255, 255)
    
    pbiz2_2 = tf_biz2.add_paragraph()
    pbiz2_2.text = "\nTargeting Ministries of Agriculture and Multinational Exporters (like Dole/Chiquita). High-value preventative defense contracts to protect national GDP."
    pbiz2_2.font.size = Pt(18)
    pbiz2_2.font.bold = True
    pbiz2_2.font.color.rgb = RGBColor(210, 210, 210)


    # ==========================
    # SLIDE 9: GLOBAL ROADMAP (BANANA)
    # ==========================
    slide9 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide9)
    add_bg_image(slide9, "ultra_visible_banana_bg.jpg")
    add_title(slide9, "Execution Plan", top=0.5, font_size=18, color=(168, 85, 247), align=PP_ALIGN.CENTER)
    add_title(slide9, "Global Roadmap (2026+)", top=1.0, font_size=55, align=PP_ALIGN.CENTER)
    
    tP1 = slide9.shapes.add_textbox(Inches(0.5), Inches(2.8), Inches(3.8), Inches(3))
    tfP1 = tP1.text_frame
    tfP1.word_wrap = True
    pP1 = tfP1.paragraphs[0]
    pP1.text = "1. Validation\nPresent - Late 2026"
    pP1.font.size = Pt(28)
    pP1.font.bold = True
    pP1.font.color.rgb = RGBColor(255,255,255)
    pP1_2 = tfP1.add_paragraph()
    pP1_2.text = "\n• Hult Prize Regional/Global Finals.\n• Final training loop with USC LONI / ADNI datasets.\n• Agro-Edge deployed in pilot farms."
    pP1_2.font.size = Pt(18)
    pP1_2.font.bold = True
    pP1_2.font.color.rgb = RGBColor(250,250,250)
    
    tP2 = slide9.shapes.add_textbox(Inches(4.7), Inches(2.8), Inches(3.8), Inches(3))
    tfP2 = tP2.text_frame
    tfP2.word_wrap = True
    pP2 = tfP2.paragraphs[0]
    pP2.text = "2. Pilot Entry\n2027"
    pP2.font.size = Pt(28)
    pP2.font.bold = True
    pP2.font.color.rgb = RGBColor(168, 85, 247) # Light Purple
    pP2_2 = tfP2.add_paragraph()
    pP2_2.text = "\n• First B2B medical clinics integrated in LatAm natively.\n• Government lobbying for TR4 prevention.\n• Seed Round funding ($1M+ Target)."
    pP2_2.font.size = Pt(18)
    pP2_2.font.bold = True
    pP2_2.font.color.rgb = RGBColor(250,250,250)
    
    tP3 = slide9.shapes.add_textbox(Inches(8.8), Inches(2.8), Inches(3.8), Inches(3))
    tfP3 = tP3.text_frame
    tfP3.word_wrap = True
    pP3 = tfP3.paragraphs[0]
    pP3.text = "3. Deep Scaling\n2028+"
    pP3.font.size = Pt(28)
    pP3.font.bold = True
    pP3.font.color.rgb = RGBColor(56, 189, 248) # Cyan
    pP3_2 = tfP3.add_paragraph()
    pP3_2.text = "\n• Enterprise partnerships with cloud providers.\n• Drone-automated inferencing for Agro.\n• Massive clinical expansions via APIs."
    pP3_2.font.size = Pt(18)
    pP3_2.font.bold = True
    pP3_2.font.color.rgb = RGBColor(250,250,250)

    # ==========================
    # SLIDE 10: TEAM & URL (BRAIN)
    # ==========================
    slide10 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide10)
    add_bg_image(slide10, "ultra_visible_brain_bg.jpg")
    
    add_title(slide10, "The Engineering Team", top=1.0, font_size=55, align=PP_ALIGN.CENTER)
    add_title(slide10, "Perdix Origin Core", top=1.8, font_size=18, color=(56, 189, 248), align=PP_ALIGN.CENTER)
    
    txTeam = slide10.shapes.add_textbox(Inches(1), Inches(3.0), Inches(11.333), Inches(1.5))
    tfTeam = txTeam.text_frame
    tfTeam.word_wrap = True
    pTeam = tfTeam.paragraphs[0]
    pTeam.text = "Erick Zambrano\nHead of AI Architecture"
    pTeam.alignment = PP_ALIGN.CENTER
    pTeam.font.size = Pt(28)
    pTeam.font.color.rgb = RGBColor(255,255,255)
    pTeam.font.bold = True
    
    pTeam2 = tfTeam.add_paragraph()
    pTeam2.text = "\nPerdix Team\nMedical & Agrotech Deep Research"
    pTeam2.alignment = PP_ALIGN.CENTER
    pTeam2.font.size = Pt(28)
    pTeam2.font.color.rgb = RGBColor(255,255,255)
    pTeam2.font.bold = True

    txUrl = slide10.shapes.add_textbox(Inches(1), Inches(5.5), Inches(11.333), Inches(1))
    tfUrl = txUrl.text_frame
    pUrl = tfUrl.paragraphs[0]
    pUrl.text = "LIVE PRODUCTION ENGINE:\nhttps://ingenieria-platform.vercel.app/"
    pUrl.alignment = PP_ALIGN.CENTER
    pUrl.font.size = Pt(32)
    pUrl.font.bold = True
    pUrl.font.color.rgb = RGBColor(56, 189, 248)
    
    pUrl2 = tfUrl.add_paragraph()
    pUrl2.text = "\nPowered by: Google DeepMind | USC LONI (IDEAS / ADNI) | Vercel"
    pUrl2.alignment = PP_ALIGN.CENTER
    pUrl2.font.size = Pt(16)
    pUrl2.font.bold = True
    pUrl2.font.color.rgb = RGBColor(230, 230, 230)

    prs.save("Hult_Prize_Pitch_International_Final.pptx")
    print("El archivo PPTX 'Hult_Prize_Pitch_International_Final.pptx' ha sido generado exitosamente.")

if __name__ == "__main__":
    generate_hult_prize_pptx()

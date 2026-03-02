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
        
    def add_title(slide, text, top=0.5, font_size=40, color=(255,255,255), align=PP_ALIGN.CENTER):
        txBox = slide.shapes.add_textbox(Inches(1), Inches(top), Inches(11.333), Inches(1))
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
    
    # Subtitulo Top
    txTop = slide1.shapes.add_textbox(Inches(4.5), Inches(1.5), Inches(4.333), Inches(0.5))
    tfTop = txTop.text_frame
    pTop = tfTop.paragraphs[0]
    pTop.text = "HULT PRIZE 2026 PITCH"
    pTop.alignment = PP_ALIGN.CENTER
    pTop.font.size = Pt(14)
    pTop.font.bold = True
    pTop.font.color.rgb = RGBColor(56, 189, 248) # Cyan-400
    
    # Titulo Principal
    txTitle = slide1.shapes.add_textbox(Inches(1), Inches(2.2), Inches(11.333), Inches(2.5))
    tfTitle = txTitle.text_frame
    tfTitle.word_wrap = True
    pTitle = tfTitle.paragraphs[0]
    pTitle.text = "Solving the Unseen.\nScaling the Impact."
    pTitle.alignment = PP_ALIGN.CENTER
    pTitle.font.size = Pt(65)
    pTitle.font.bold = True
    pTitle.font.color.rgb = RGBColor(255, 255, 255)
    
    # Subtitulo Bottom
    txSub = slide1.shapes.add_textbox(Inches(1.5), Inches(5), Inches(10.333), Inches(1))
    tfSub = txSub.text_frame
    tfSub.word_wrap = True
    pSub = tfSub.paragraphs[0]
    pSub.text = "Dual AI Architecture for Global Healthcare (Alzheimer's) and Food Security (Banana Plagues)."
    pSub.alignment = PP_ALIGN.CENTER
    pSub.font.size = Pt(24)
    pSub.font.color.rgb = RGBColor(200, 200, 200)

    # ==========================
    # SLIDE 2: PROBLEM
    # ==========================
    slide2 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide2)
    
    add_title(slide2, "Two Planetary Crises.\nOne Root Cause: Late Detection.", top=0.8, font_size=45, color=(255,255,255), align=PP_ALIGN.LEFT)
    
    # Left Col (Alzheimer)
    tx_alz = slide2.shapes.add_textbox(Inches(1), Inches(3), Inches(5.2), Inches(3.5))
    tf_alz = tx_alz.text_frame
    tf_alz.word_wrap = True
    pA1 = tf_alz.paragraphs[0]
    pA1.text = "1. Healthcare (Alzheimer's)"
    pA1.font.size = Pt(28)
    pA1.font.bold = True
    pA1.font.color.rgb = RGBColor(255, 255, 255)
    
    pA2 = tf_alz.add_paragraph()
    pA2.text = "\n• 55M+ Global dementia patients. Structural brain damage is irreversible by the time symptoms appear."
    pA2.font.size = Pt(18)
    pA2.font.color.rgb = RGBColor(180, 180, 180)
    
    pA3 = tf_alz.add_paragraph()
    pA3.text = "\n• 20% Misdiagnosis rate in standard health systems due to fragmented human analysis."
    pA3.font.size = Pt(18)
    pA3.font.color.rgb = RGBColor(180, 180, 180)

    # Right Col (Agro)
    tx_agr = slide2.shapes.add_textbox(Inches(7), Inches(3), Inches(5.2), Inches(3.5))
    tf_agr = tx_agr.text_frame
    tf_agr.word_wrap = True
    pAg1 = tf_agr.paragraphs[0]
    pAg1.text = "2. Food Security (Agro)"
    pAg1.font.size = Pt(28)
    pAg1.font.bold = True
    pAg1.font.color.rgb = RGBColor(255, 255, 255)
    
    pAg2 = tf_agr.add_paragraph()
    pAg2.text = "\n• TR4 Fusarium Wilt ravages global crops, destroying the livelihoods of developing nations."
    pAg2.font.size = Pt(18)
    pAg2.font.color.rgb = RGBColor(180, 180, 180)
    
    pAg3 = tf_agr.add_paragraph()
    pAg3.text = "\n• 100% Plantation loss occurs because farmers lack access to laboratory-grade phytopathology tools."
    pAg3.font.size = Pt(18)
    pAg3.font.color.rgb = RGBColor(180, 180, 180)

    # ==========================
    # SLIDE 3: SOLUCION ALZHEIMER
    # ==========================
    slide3 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide3)
    
    add_title(slide3, "Healthcare Solution", top=0.5, font_size=18, color=(56, 189, 248), align=PP_ALIGN.LEFT)
    add_title(slide3, "Perdix Vision AI", top=1.0, font_size=45, align=PP_ALIGN.LEFT)
    
    txDesc = slide3.shapes.add_textbox(Inches(1), Inches(1.8), Inches(11.333), Inches(0.8))
    tfDesc = txDesc.text_frame
    tfDesc.word_wrap = True
    pDesc = tfDesc.paragraphs[0]
    pDesc.text = "We engineered a Multimodal Diagnostic Orchestrator that fuses deep anatomy with clinical reality, matching the exact protocols of top-tier US laboratories (USC / Harvard)."
    pDesc.font.size = Pt(18)
    pDesc.font.color.rgb = RGBColor(200, 200, 200)

    # Left content
    txS3L = slide3.shapes.add_textbox(Inches(1), Inches(3), Inches(5), Inches(4))
    tfS3L = txS3L.text_frame
    tfS3L.word_wrap = True
    
    pS1 = tfS3L.paragraphs[0]
    pS1.text = "1. The ADNI Pre-Processing Standard"
    pS1.font.bold = True
    pS1.font.size = Pt(20)
    pS1_1 = tfS3L.add_paragraph()
    pS1_1.text = "Trained under the strict paradigms of the ADNI (IDA LONI). We utilize mathematically rigorous 3D tensor extraction directly from NIfTI MRI."
    pS1_1.font.size = Pt(14)
    pS1_1.font.color.rgb = RGBColor(180,180,180)
    
    pS2 = tfS3L.add_paragraph()
    pS2.text = "\n2. Late-Fusion Multivariate Architecture"
    pS2.font.bold = True
    pS2.font.size = Pt(20)
    pS2_1 = tfS3L.add_paragraph()
    pS2_1.text = "Our AI organically fuses 128 deep Keras parameters perfectly intertwined with Patient Age, MMSE, and BMI through an XGBoost logic tree."
    pS2_1.font.size = Pt(14)
    pS2_1.font.color.rgb = RGBColor(180,180,180)
    
    # Try images
    try:
        if os.path.exists("public/alzheimer-assets/image_7_0.png"):
            slide3.shapes.add_picture("public/alzheimer-assets/image_7_0.png", Inches(6.5), Inches(3.5), width=Inches(3.2))
        if os.path.exists("public/alzheimer-assets/mock_roc.png"):
            slide3.shapes.add_picture("public/alzheimer-assets/mock_roc.png", Inches(9.8), Inches(3.5), width=Inches(3.2))
    except Exception as e:
        print(f"Skipping images for PPTX: {e}")

    # ==========================
    # SLIDE 4: SOLUCION BANANA
    # ==========================
    slide4 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide4)
    
    add_title(slide4, "AgroTech Solution", top=0.8, font_size=18, color=(74, 222, 128), align=PP_ALIGN.CENTER)
    add_title(slide4, "Banana Disease Core", top=1.3, font_size=60, align=PP_ALIGN.CENTER)
    
    txStats = slide4.shapes.add_textbox(Inches(1), Inches(3.5), Inches(11.333), Inches(1.5))
    tfStats = txStats.text_frame
    tfStats.word_wrap = True
    pStats = tfStats.paragraphs[0]
    pStats.text = "99% TARGET ACCURACY      |      EDGE OFFLINE EXECUTION      |      < 1s INFERENCE TIME"
    pStats.alignment = PP_ALIGN.CENTER
    pStats.font.bold = True
    pStats.font.size = Pt(24)
    pStats.font.color.rgb = RGBColor(74, 222, 128)
    
    txAGesc = slide4.shapes.add_textbox(Inches(2), Inches(5), Inches(9.333), Inches(1.5))
    tfAGesc = txAGesc.text_frame
    tfAGesc.word_wrap = True
    pag = tfAGesc.paragraphs[0]
    pag.text = "Utilizing Convolutional Neural Networks to detect microscopic symptomatic patterns on banana leaves, stopping plagues like TR4 before they spread across borders and ensuring farmer sovereignty."
    pag.alignment = PP_ALIGN.CENTER
    pag.font.size = Pt(20)
    pag.font.color.rgb = RGBColor(200, 200, 200)

    # ==========================
    # SLIDE 5: BUSINESS VIABILITY
    # ==========================
    slide5 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide5)
    add_title(slide5, "Impact & Business Viability", top=0.5, font_size=18, color=(250, 204, 21), align=PP_ALIGN.LEFT)
    add_title(slide5, "Sustainable B2B & B2G Models", top=1.0, font_size=45, align=PP_ALIGN.LEFT)

    # Left Col (Healthcare B2B)
    tx_biz1 = slide5.shapes.add_textbox(Inches(1), Inches(2.5), Inches(5.2), Inches(3))
    tf_biz1 = tx_biz1.text_frame
    tf_biz1.word_wrap = True
    pbiz1 = tf_biz1.paragraphs[0]
    pbiz1.text = "⚕️ Healthcare SaaS"
    pbiz1.font.size = Pt(28)
    pbiz1.font.bold = True
    pbiz1.font.color.rgb = RGBColor(255, 255, 255)
    
    pbiz1_2 = tf_biz1.add_paragraph()
    pbiz1_2.text = "\nLicensing the ADNI-Standard API directly to regional hospitals, clinics, and health-tech startups. Monetized per API-inference or via enterprise yearly licenses."
    pbiz1_2.font.size = Pt(18)
    pbiz1_2.font.color.rgb = RGBColor(180, 180, 180)

    # Right Col (Agro B2G)
    tx_biz2 = slide5.shapes.add_textbox(Inches(7), Inches(2.5), Inches(5.2), Inches(3))
    tf_biz2 = tx_biz2.text_frame
    tf_biz2.word_wrap = True
    pbiz2 = tf_biz2.paragraphs[0]
    pbiz2.text = "🌾 Agriculture B2G"
    pbiz2.font.size = Pt(28)
    pbiz2.font.bold = True
    pbiz2.font.color.rgb = RGBColor(255, 255, 255)
    
    pbiz2_2 = tf_biz2.add_paragraph()
    pbiz2_2.text = "\nSelling the Agronomic Edge Model to Ministries of Agriculture and large-scale farming conglomerates under preventative strategic contracts."
    pbiz2_2.font.size = Pt(18)
    pbiz2_2.font.color.rgb = RGBColor(180, 180, 180)
    
    txUnify = slide5.shapes.add_textbox(Inches(1), Inches(6), Inches(11.333), Inches(1))
    tfUnify = txUnify.text_frame
    tfUnify.word_wrap = True
    pUnify = tfUnify.paragraphs[0]
    pUnify.text = "Both engines are unified mathematically under the Perdix Origin Platform infrastructure, maximizing server efficiency and reducing OPEX."
    pUnify.alignment = PP_ALIGN.CENTER
    pUnify.font.size = Pt(16)
    pUnify.font.italic = True
    pUnify.font.color.rgb = RGBColor(180, 180, 180)

    # ==========================
    # SLIDE 6: TEAM & URL
    # ==========================
    slide6 = prs.slides.add_slide(blank_slide_layout)
    set_dark_bg(slide6)
    
    add_title(slide6, "The Engineering Team", top=1.0, font_size=45, align=PP_ALIGN.CENTER)
    add_title(slide6, "Perdix Origin Core", top=1.8, font_size=18, color=(56, 189, 248), align=PP_ALIGN.CENTER)
    
    # Team
    txTeam = slide6.shapes.add_textbox(Inches(1), Inches(3.0), Inches(11.333), Inches(1.5))
    tfTeam = txTeam.text_frame
    tfTeam.word_wrap = True
    pTeam = tfTeam.paragraphs[0]
    pTeam.text = "Erick Zambrano\nHead of AI Architecture"
    pTeam.alignment = PP_ALIGN.CENTER
    pTeam.font.size = Pt(24)
    pTeam.font.bold = True
    
    pTeam2 = tfTeam.add_paragraph()
    pTeam2.text = "\nPerdix Team\nMedical & Agrotech Ops"
    pTeam2.alignment = PP_ALIGN.CENTER
    pTeam2.font.size = Pt(24)
    pTeam2.font.bold = True

    # URL
    txUrl = slide6.shapes.add_textbox(Inches(1), Inches(5.5), Inches(11.333), Inches(1))
    tfUrl = txUrl.text_frame
    pUrl = tfUrl.paragraphs[0]
    pUrl.text = "LIVE PRODUCTION ENGINE:\nhttps://ingenieria-platform.vercel.app/"
    pUrl.alignment = PP_ALIGN.CENTER
    pUrl.font.size = Pt(28)
    pUrl.font.bold = True
    pUrl.font.color.rgb = RGBColor(56, 189, 248)

    prs.save("Hult_Prize_Pitch_Perdix_Origin.pptx")
    print("El archivo PPTX 'Hult_Prize_Pitch_Perdix_Origin.pptx' ha sido generado exitosamente.")

if __name__ == "__main__":
    generate_hult_prize_pptx()

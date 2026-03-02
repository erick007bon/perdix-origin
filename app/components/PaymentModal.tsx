"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, QrCode, Check, Send } from "lucide-react";
import { useState } from "react";

export default function PaymentModal({ isOpen, onClose, itemName, price }: any) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#1e1e1e] border border-white/10 shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 text-center">
            <h3 className="text-xl font-bold text-white">Activar Licencia</h3>
            <p className="text-white/80 text-sm">Pago único sin comisiones</p>
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full bg-white/20 p-1 text-white hover:bg-white/30"
            >
                <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-8">
            <div className="mb-6 text-center">
                <h4 className="text-lg font-semibold text-white">{itemName}</h4>
                <div className="mt-2 text-3xl font-bold text-yellow-500">${price}</div>
            </div>

            {/* QR Mockup */}
            <div className="mx-auto mb-6 h-48 w-48 rounded-xl bg-white p-2">
                <div className="h-full w-full bg-black flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                    <QrCode className="h-24 w-24 text-white" />
                    {/* Aquí iría la imagen real del QR de Pichincha */}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-white/5 p-3 border border-white/5">
                    <span className="text-sm text-gray-400">Banco:</span>
                    <span className="font-medium text-white">Banco Pichincha (Cta. Ahorros)</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/5 p-3 border border-white/5">
                    <span className="text-sm text-gray-400">Titular:</span>
                    <span className="font-medium text-white">Erick Flores</span>
                </div>
            </div>

            <button 
                onClick={() => {
                    const msg = `Hola Erick, ya realicé el pago de $${price} para el bot ${itemName}. Adjunto mi comprobante.`;
                    window.open(`https://wa.me/593963951193?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 font-bold text-white hover:bg-green-700 transition-all shadow-lg shadow-green-900/20"
            >
                <Send className="h-5 w-5" />
                Enviar Comprobante al WhatsApp
            </button>
            
            <p className="mt-4 text-center text-xs text-gray-500">
                La activación es manual y puede tomar hasta 1 hora laborable.
            </p>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

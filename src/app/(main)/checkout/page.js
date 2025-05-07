'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Datos de ejemplo para el proceso de checkout
const cartSummary = {
  subtotal: 345.49,
  tax: 62.19,
  shipping: 10.00,
  discount: 34.55,
  total: 383.13,
  items: [
    {
      id: 1,
      name: "Chal de alpaca trenzado",
      price: 89.99,
      quantity: 1,
      image: "/assets/macbook_image.png",
    },
    {
      id: 2,
      name: "Cerámica artesanal Inca",
      price: 120.00,
      quantity: 2,
      image: "/assets/bose_headphone_image.png",
    },
    {
      id: 3,
      name: "Café orgánico de altura",
      price: 35.50,
      quantity: 1,
      image: "/assets/cannon_camera_image.png",
    }
  ]
};

export default function CheckoutPage() {
  // Estados para los formularios
  const [activeStep, setActiveStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [saveInfo, setSaveInfo] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Función para manejar cambios en el formulario de envío
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    // Limpiar errores cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Función para manejar cambios en el formulario de pago
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
    // Limpiar errores cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Validación del formulario de envío
  const validateShippingInfo = () => {
    const newErrors = {};
    if (!shippingInfo.fullName.trim()) newErrors.fullName = 'Nombre completo es requerido';
    if (!shippingInfo.address.trim()) newErrors.address = 'Dirección es requerida';
    if (!shippingInfo.city.trim()) newErrors.city = 'Ciudad es requerida';
    if (!shippingInfo.region.trim()) newErrors.region = 'Región es requerida';
    if (!shippingInfo.postalCode.trim()) newErrors.postalCode = 'Código postal es requerido';
    if (!shippingInfo.phone.trim()) newErrors.phone = 'Teléfono es requerido';
    if (!shippingInfo.email.trim()) {
      newErrors.email = 'Email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      newErrors.email = 'Email inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validación del formulario de pago
  const validatePaymentInfo = () => {
    if (paymentMethod !== 'credit-card') return true;
    
    const newErrors = {};
    if (!cardInfo.cardNumber.trim()) newErrors.cardNumber = 'Número de tarjeta es requerido';
    if (!cardInfo.cardName.trim()) newErrors.cardName = 'Nombre en la tarjeta es requerido';
    if (!cardInfo.expiryDate.trim()) newErrors.expiryDate = 'Fecha de expiración es requerida';
    if (!cardInfo.cvv.trim()) newErrors.cvv = 'CVV es requerido';
    if (!termsAccepted) newErrors.terms = 'Debes aceptar los términos y condiciones';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envío del formulario de información de envío
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (validateShippingInfo()) {
      setActiveStep(2);
      window.scrollTo(0, 0);
    }
  };

  // Manejar el envío del formulario de pago
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (validatePaymentInfo()) {
      setIsProcessing(true);
      // Simulación de procesamiento de pago
      setTimeout(() => {
        setIsProcessing(false);
        setOrderCompleted(true);
        setOrderNumber('AB-' + Math.floor(100000 + Math.random() * 900000));
        window.scrollTo(0, 0);
      }, 2000);
    }
  };

  // Formatear precios
  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  // Volver al paso anterior
  const goBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {!orderCompleted ? (
          <>
            {/* Pasos del checkout */}
            <div className="mb-10">
              <div className="flex justify-between">
                <div className={`flex-1 text-center ${activeStep >= 1 ? 'text-amber-600' : 'text-gray-400'}`}>
                  <div className={`flex items-center justify-center mx-auto w-8 h-8 rounded-full mb-2 ${
                    activeStep >= 1 ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <span className="text-sm font-medium">Envío</span>
                </div>
                <div className={`flex-1 text-center ${activeStep >= 2 ? 'text-amber-600' : 'text-gray-400'}`}>
                  <div className={`flex items-center justify-center mx-auto w-8 h-8 rounded-full mb-2 ${
                    activeStep >= 2 ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <span className="text-sm font-medium">Pago</span>
                </div>
                <div className={`flex-1 text-center ${activeStep >= 3 ? 'text-amber-600' : 'text-gray-400'}`}>
                  <div className={`flex items-center justify-center mx-auto w-8 h-8 rounded-full mb-2 ${
                    activeStep >= 3 ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <span className="text-sm font-medium">Confirmación</span>
                </div>
              </div>
              <div className="mt-2 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-300 ease-in-out"
                    style={{ width: `${((activeStep - 1) / 2) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Formularios */}
              <div className="md:w-2/3">
                {activeStep === 1 && (
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-900">Información de Envío</h2>
                    </div>
                    <form onSubmit={handleShippingSubmit} className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre completo *
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={shippingInfo.fullName}
                            onChange={handleShippingChange}
                            className={`text-black block w-full rounded-md shadow-sm sm:text-sm ${
                              errors.fullName 
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'
                            }`}
                          />
                          {errors.fullName && (
                            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                          )}
                        </div>
                        
                        <div className="col-span-2">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Dirección de envío *
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={shippingInfo.address}
                            onChange={handleShippingChange}
                            className={` text-black block w-full rounded-md shadow-sm sm:text-sm ${
                              errors.address 
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'
                            }`}
                          />
                          {errors.address && (
                            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            Ciudad *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={shippingInfo.city}
                            onChange={handleShippingChange}
                            className={`text-black block w-full rounded-md shadow-sm sm:text-sm ${
                              errors.city 
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'
                            }`}
                          />
                          {errors.city && (
                            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                            Región/Departamento *
                          </label>
                          <select
                            id="region"
                            name="region"
                            value={shippingInfo.region}
                            onChange={handleShippingChange}
                            className={`text-black block w-full rounded-md shadow-sm sm:text-sm ${
                              errors.region 
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'
                            }`}
                          >
                            <option value="">Seleccionar región</option>
                            <option value="cusco">Cusco</option>
                            <option value="lima">Lima</option>
                            <option value="arequipa">Arequipa</option>
                            <option value="puno">Puno</option>
                            <option value="ayacucho">Ayacucho</option>
                          </select>
                          {errors.region && (
                            <p className="mt-1 text-sm text-red-600">{errors.region}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Código postal *
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={shippingInfo.postalCode}
                            onChange={handleShippingChange}
                            className={`text-black block w-full rounded-md shadow-sm sm:text-sm ${
                              errors.postalCode 
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'
                            }`}
                          />
                          {errors.postalCode && (
                            <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Teléfono *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={shippingInfo.phone}
                            onChange={handleShippingChange}
                            className={`text-black block w-full rounded-md shadow-sm sm:text-sm ${
                              errors.phone 
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'
                            }`}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={shippingInfo.email}
                            onChange={handleShippingChange}
                            className={`text-black block w-full rounded-md shadow-sm sm:text-sm ${
                              errors.email 
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'
                            }`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                          )}
                        </div>

                        <div className="col-span-2">
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                            Notas adicionales (opcional)
                          </label>
                          <textarea
                            id="notes"
                            name="notes"
                            rows="3"
                            value={shippingInfo.notes}
                            onChange={handleShippingChange}
                            className="text-black block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                            placeholder="Instrucciones especiales para la entrega, puntos de referencia, etc."
                          ></textarea>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <Link 
                          href="/cart" 
                          className="text-amber-600 hover:text-amber-700 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Volver al carrito
                        </Link>
                        <button 
                          type="submit"
                          className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                          Continuar con el pago
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-900">Información de Pago</h2>
                    </div>
                    <form onSubmit={handlePaymentSubmit} className="p-6 space-y-6">
                      <div>
                        <label className="text-base font-medium text-gray-700">Método de pago</label>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center">
                            <input
                              id="credit-card"
                              name="payment-method"
                              type="radio"
                              checked={paymentMethod === 'credit-card'}
                              onChange={() => setPaymentMethod('credit-card')}
                              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                            />
                            <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                              Tarjeta de crédito/débito
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="paypal"
                              name="payment-method"
                              type="radio"
                              checked={paymentMethod === 'paypal'}
                              onChange={() => setPaymentMethod('paypal')}
                              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                            />
                            <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                              PayPal
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="cash-on-delivery"
                              name="payment-method"
                              type="radio"
                              checked={paymentMethod === 'cash-on-delivery'}
                              onChange={() => setPaymentMethod('cash-on-delivery')}
                              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                            />
                            <label htmlFor="cash-on-delivery" className="ml-3 block text-sm font-medium text-gray-700">
                              Pago contra entrega
                            </label>
                          </div>
                        </div>
                      </div>

                      {paymentMethod === 'credit-card' && (
                        <div className="border rounded-md p-4 mt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                Número de tarjeta *
                              </label>
                              <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={cardInfo.cardNumber}
                                onChange={handlePaymentChange}
                                placeholder="1234 5678 9012 3456"
                                className={`text-black block w-full rounded-md shadow-sm sm:text-sm ${
                                  errors.cardNumber 
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                    : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'
                                }`}
                              />
                              {errors.cardNumber && (
                                <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                              )}
                            </div>
                            <div className="col-span-2">
                              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre en la tarjeta *
                              </label>
                              <input
                                type="text"
                                id="cardName"
                                name="cardName"
                                value={cardInfo.cardName}
                                onChange={handlePaymentChange}
                                className={`text-black block w-full rounded-md shadow-sm sm:text-sm ${
                                  errors.cardName 
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                    : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'
                                }`}
                              />
                              {errors.cardName && (
                                <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                              )}
                            </div>
                            <div>
                              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha de expiración *
                              </label>
                              <input
                                type="text" // Cambiar de date a text
                                id="expiryDate"
                                name="expiryDate"
                                value={cardInfo.expiryDate}
                                onChange={handlePaymentChange}
                                placeholder="MM/YY"
                                maxLength="5" // Limitar a 5 caracteres (MM/YY)
                                pattern="\d{2}/\d{2}" // Validar formato numérico
                                className={`text-black block w-full rounded-md shadow-sm sm:text-sm ${
                                  errors.expiryDate 
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                    : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'
                                }`}
                                onKeyPress={(e) => {
                                  // Solo permitir números y slash
                                  if (!/[0-9]|\//.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                onInput={(e) => {
                                  // Formatear automáticamente
                                  const value = e.target.value.replace(/\D/g, '');
                                  if (value.length > 2) {
                                    e.target.value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                                  }
                                }}
                              />
                              {errors.expiryDate && (
                                <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                              )}
                            </div>
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                CVV *
                              </label>
                              <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={cardInfo.cvv}
                                onChange={handlePaymentChange}
                                placeholder="123"
                                className={`text-black block w-full rounded-md shadow-sm sm:text-sm ${
                                  errors.cvv 
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                    : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'
                                }`}
                              />
                              {errors.cvv && (
                                <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'paypal' && (
                        <div className="border rounded-md p-4 mt-4">
                          <p className="text-sm text-gray-600">
                            Serás redirigido a PayPal para completar tu compra de forma segura.
                          </p>
                          <div className="mt-4 flex justify-center">
                            <Image src="/assets/paypal.svg" alt="PayPal" width={120} height={30} />
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'cash-on-delivery' && (
                        <div className="border rounded-md p-4 mt-4">
                          <p className="text-sm text-gray-600">
                            Pagarás en efectivo al momento de la entrega. Ten en cuenta que nuestro repartidor podría no tener cambio exacto.
                          </p>
                        </div>
                      )}

                      <div className="space-y-4 pt-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="saveInfo"
                              name="saveInfo"
                              type="checkbox"
                              checked={saveInfo}
                              onChange={() => setSaveInfo(!saveInfo)}
                              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="saveInfo" className="font-medium text-gray-700">
                              Guardar esta información para próximas compras
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="terms"
                              name="terms"
                              type="checkbox"
                              checked={termsAccepted}
                              onChange={() => {
                                setTermsAccepted(!termsAccepted);
                                if (errors.terms) {
                                  setErrors({...errors, terms: null});
                                }
                              }}
                              className={`h-4 w-4 focus:ring-amber-500 border-gray-300 rounded ${
                                errors.terms ? 'text-red-500 border-red-300' : 'text-amber-600'
                              }`}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className={`font-medium ${errors.terms ? 'text-red-500' : 'text-gray-700'}`}>
                              Acepto los términos y condiciones
                            </label>
                            {errors.terms && (
                              <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <button 
                          type="button"
                          onClick={goBack}
                          className="text-amber-600 hover:text-amber-700 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Volver a envío
                        </button>
                        <button 
                          type="submit"
                          disabled={isProcessing}
                          className={`inline-flex justify-center items-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                            isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
                          }`}
                        >
                          {isProcessing ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Procesando...
                            </>
                          ) : (
                            'Completar orden'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Resumen de la orden */}
              <div className="md:w-1/3">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 sticky top-8">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Resumen</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {cartSummary.items.map((item) => (
                        <div key={item.id} className="flex">
                          <div className="flex-shrink-0 w-16 h-16 relative mr-4 border rounded">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                            <p className="text-sm font-medium text-amber-600">S/ {formatPrice(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Subtotal</span>
                        <span className=" text-black text-sm font-medium">S/ {formatPrice(cartSummary.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Impuestos (18%)</span>
                        <span className="text-black text-sm">S/ {formatPrice(cartSummary.tax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Envío</span>
                        <span className="text-black text-sm">S/ {formatPrice(cartSummary.shipping)}</span>
                      </div>
                      {cartSummary.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span className="text-sm">Descuento</span>
                          <span className="text-sm">- S/ {formatPrice(cartSummary.discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                        <span className="text-black text-base font-bold">Total</span>
                        <span className="text-black text-base font-bold">S/ {formatPrice(cartSummary.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Confirmación de pedido
          <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-2xl mx-auto">
            <div className="p-6 text-center">
              <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">¡Gracias por tu compra!</h1>
              <p className="text-gray-600 mb-6">
                Tu pedido ha sido confirmado y está siendo procesado.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 inline-block">
                <p className="text-sm text-gray-600 mb-1">Número de orden:</p>
                <p className="text-lg font-bold text-gray-900">{orderNumber}</p>
              </div>
              <p className="text-sm text-gray-600 mb-8">
                Te hemos enviado un correo electrónico con la confirmación de tu pedido y detalles de seguimiento.
              </p>
              <div className="space-y-4">
                <Link 
                  href="/customer/orders" 
                  className="block w-full py-3 px-4 rounded-md text-center font-medium bg-amber-600 text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Ver mi pedido
                </Link>
                <Link 
                  href="/" 
                  className="block w-full py-3 px-4 rounded-md text-center font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
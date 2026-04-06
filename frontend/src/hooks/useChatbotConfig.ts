// src/hooks/useChatbotConfig.ts
import { useState, useEffect, useCallback } from 'react';
import {
  getConfig,
  upsertConfig,
  toggleConfig,
  deleteConfig,
} from '../services/chatbotConfigService';
import type { ChatbotConfig } from '../services/chatbotConfigService';
const DEFAULT_CONFIG: ChatbotConfig = {
  welcome_message:
    "Bonjour ! 👋 Je suis l'assistant de 3D Services. Je peux vous aider pour :\n• Obtenir un devis de débarras\n• Connaître nos tarifs\n• Prendre rendez-vous\nComment puis-je vous aider ?",
  system_prompt:
    "Tu es l'assistant virtuel de 3D Services, une entreprise de débarras en Île-de-France. Tu es professionnel, chaleureux et efficace. Tu connais les services : débarras maison/appartement, cave, garage, succession, nettoyage Diogène, dératisation. Zone : Paris et Île-de-France. Téléphone : 06 09 99 17 36.",
  proactive_delay: 30,
  proactive_message: "Besoin d'un devis gratuit ? Je peux vous aider ! 😊",
  suggestions: [
    {
      text: 'Obtenir un devis',
      response:
        'Pour obtenir un devis gratuit, il me faut quelques informations : votre adresse, le type de prestation souhaitée et le volume approximatif. Vous pouvez aussi appeler le 06 09 99 17 36.',
    },
    {
      text: 'Quels sont vos tarifs ?',
      response:
        "Nos tarifs démarrent à partir de 80€ pour un petit débarras. Le prix dépend du volume, de l'accessibilité et du type d'objets. Consultez notre page tarifs pour plus de détails.",
    },
    {
      text: "Zones d'intervention",
      response:
        "Nous intervenons sur Paris et toute l'Île-de-France : 75, 77, 78, 91, 92, 93, 94, 95. Intervention possible sous 24-48h.",
    },
    {
      text: 'Prendre rendez-vous',
      response:
        'Pour prendre rendez-vous, appelez-nous au 06 09 99 17 36 ou remplissez le formulaire de devis en ligne. Nous vous recontactons sous 2h.',
    },
  ],
  max_messages: 50,
  enabled: true,
};

export const useChatbotConfig = () => {
  const [config, setConfig]     = useState<ChatbotConfig>(DEFAULT_CONFIG);
  const [loading, setLoading]   = useState<boolean>(false);
  const [saving, setSaving]     = useState<boolean>(false);
  const [saved, setSaved]       = useState<boolean>(false);
  const [error, setError]       = useState<string | null>(null);

  // ── Charger la config depuis l'API au montage ──
  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getConfig();
      if (res.data) {
        setConfig(res.data);
      }
      // Si 404 : on reste sur DEFAULT_CONFIG, l'enregistrement créera la ligne
    } catch (err: any) {
      // 404 = pas encore de config → normal au premier lancement
      if (err?.response?.status !== 404) {
        setError('Impossible de charger la configuration.');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  // ── Sauvegarder (create ou update) ──
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await upsertConfig(config);
      if (res.data) {
        setConfig(res.data);  // met à jour l'ID si nouvelle création
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: any) {
      setError('Erreur lors de la sauvegarde.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // ── Toggle actif/inactif (PATCH) ──
  const handleToggle = async () => {
    if (!config.id) {
      // Pas encore en BDD : on bascule localement
      setConfig(prev => ({ ...prev, enabled: !prev.enabled }));
      return;
    }
    try {
      const res = await toggleConfig(config.id);
      if (res.data) setConfig(res.data);
    } catch (err) {
      setError('Erreur lors du changement de statut.');
      console.error(err);
    }
  };

  // ── Réinitialiser aux valeurs par défaut ──
  const handleReset = () => {
    setConfig({ ...DEFAULT_CONFIG, id: config.id }); // conserve l'ID pour le PUT
  };

  // ── Supprimer la configuration ──
  const handleDelete = async () => {
    if (!config.id) return;
    try {
      await deleteConfig(config.id);
      setConfig(DEFAULT_CONFIG);
    } catch (err) {
      setError('Erreur lors de la suppression.');
      console.error(err);
    }
  };

  return {
    config,
    setConfig,
    loading,
    saving,
    saved,
    error,
    handleSave,
    handleToggle,
    handleReset,
    handleDelete,
  };
};
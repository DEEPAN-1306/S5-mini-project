import React, { useState } from 'react'
import { Settings, Save, Shield, Database, Bell, RotateCcw } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { Breadcrumbs } from '../../components/common/Breadcrumbs'
import { useToast } from '../../context/ToastContext'

const DEFAULT_SETTINGS = {
  academicYear: '2025 - 2026',
  maxTeamSize: '5',
  minInterdisciplinaryDepts: '2',
  mentorSupervisionLimit: '5',
  surveyMandatory: 'true',
}

export const PlatformSettingsPage = () => {
  const { toast } = useToast()
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('capstone_platform_settings')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_SETTINGS
  })

  const handleSave = (e) => {
    e.preventDefault()
    localStorage.setItem('capstone_platform_settings', JSON.stringify(settings))
    toast.success('Institutional platform parameters updated and persisted to university configuration store.')
  }

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS)
    localStorage.setItem('capstone_platform_settings', JSON.stringify(DEFAULT_SETTINGS))
    toast.info('Settings reset to default university baseline.')
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs items={[{ label: 'Administration' }, { label: 'Platform Settings' }]} />
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Platform Governance &amp; Institutional Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure semester timelines, cross-disciplinary requirements, and academic compliance thresholds.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
          <Input
            label="Current Academic Session"
            value={settings.academicYear}
            onChange={(e) => setSettings({ ...settings, academicYear: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Maximum Capstone Team Size"
              type="number"
              min="1"
              max="10"
              value={settings.maxTeamSize}
              onChange={(e) => setSettings({ ...settings, maxTeamSize: e.target.value })}
              required
            />

            <Input
              label="Min. Distinct Departments per Team"
              type="number"
              min="1"
              max="5"
              value={settings.minInterdisciplinaryDepts}
              onChange={(e) => setSettings({ ...settings, minInterdisciplinaryDepts: e.target.value })}
              helperText="Enforces multidisciplinary collaboration"
              required
            />
          </div>

          <Input
            label="Default Faculty Mentoring Cap (Teams per Guide)"
            type="number"
            min="1"
            max="12"
            value={settings.mentorSupervisionLimit}
            onChange={(e) => setSettings({ ...settings, mentorSupervisionLimit: e.target.value })}
            helperText="Prevents faculty overload"
            required
          />

          <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Reset to Institutional Baseline
            </Button>
            <Button variant="gradient" size="sm" type="submit" leftIcon={<Save className="w-4 h-4" />}>
              Save Institutional Parameters
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

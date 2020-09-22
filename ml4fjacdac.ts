namespace jacdac {
    export class ML4FHost extends MLHost {
        model: ml4f.Model

        constructor(agg: SensorAggregatorHost) {
            super("ml4f", ModelRunnerModelFormat.ML4F, agg);
        }

        protected invokeModel() {
            try {
                this.outputs = this.model.invoke(this.agg.samplesBuffer)
            } catch (e) {
                if (typeof e == "string")
                    this.lastError = e
                control.dmesgValue(e)
            }
        }

        protected eraseModel() {
            this.model = null
            binstore.erase()
        }

        protected loadModelImpl() {
            try {
                this.model = new ml4f.Model(this.modelBuffer)
            } catch (e) {
                if (typeof e == "string")
                    this.lastError = e
                control.dmesgValue(e)
            }
        }

        get arenaBytes() {
            return this.model.arenaSize
        }

        get inputShape(): number[] {
            return this.model.inputShape
        }

        get outputShape(): number[] {
            return this.model.outputShape
        }
    }

    //% whenUsed
    export const ml4fHost = new ML4FHost(sensorAggregatorHost)
}